import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserCircle2, Calendar, Phone, Mail, Clock, RefreshCw, Trash2, CheckCircle, Plus } from 'lucide-react';

interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: string;
  createdAt: any;
}

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newBooking, setNewBooking] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const EXPECTED_ADMIN_ID = 'shamsalqamar';
  // Use a valid email format for Firebase
  const ADMIN_EMAIL = 'shamsalqamar@admin.local';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
        fetchBookings();
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (adminId !== EXPECTED_ADMIN_ID) {
      setLoginError('Unauthorized Admin ID.');
      return;
    }
    try {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      } catch (signInError: any) {
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
          // Attempt to create the admin account if it doesn't exist yet
          await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, password);
        } else {
          throw signInError;
        }
      }
    } catch (error: any) {
      console.error(error);
      setLoginError(error.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const fetchBookings = async () => {
    setFetching(true);
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Booking[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(data);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
        alert("Firebase Permissions Error: You need to update your Firestore rules in the Firebase Console.\n\nGo to your Firebase project -> Firestore Database -> Rules, and set:\n\nrules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /bookings/{document=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}");
      }
    } finally {
      setFetching(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bookings'), {
        ...newBooking,
        createdAt: serverTimestamp(),
        status: 'confirmed',
        addedByAdmin: true
      });
      setShowAddModal(false);
      setNewBooking({
        firstName: '', lastName: '', email: '', phone: '', projectType: '',
        preferredDate: '', preferredTime: '', message: ''
      });
      fetchBookings();
    } catch (error) {
      console.error('Error adding booking:', error);
      alert('Failed to add booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-32 px-8 flex justify-center items-start">
        <div className="w-full max-w-md bg-surface p-10 border border-outline-variant/30 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
            <UserCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-headline-md text-primary mb-6">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-50 text-red-600 p-3 text-sm font-body-sm">
                {loginError}
              </div>
            )}
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Admin ID"
              className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary transition-colors"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 font-label-sm uppercase tracking-widest hover:bg-secondary transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 px-8 md:px-margin-edge pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display-sm text-primary">Admin Dashboard</h1>
            <p className="font-body-md text-on-surface-variant">Manage your bookings and appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-on-primary px-6 py-2 font-label-sm uppercase tracking-widest hover:bg-secondary inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Booking
            </button>
            <button
              onClick={handleLogout}
              className="border border-primary text-primary px-6 py-2 font-label-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/30 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/30 bg-primary/5">
            <h2 className="font-headline-sm text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Recent Bookings
            </h2>
            <button onClick={fetchBookings} disabled={fetching} className="text-secondary hover:text-primary transition-colors">
              <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant uppercase tracking-wider font-label-sm text-xs">
                  <th className="p-4">Client</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-primary">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-4">
                        <div className="font-headline-sm text-sm">{booking.firstName} {booking.lastName}</div>
                        <div className="text-on-surface-variant flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3" /> {booking.email || 'N/A'}
                        </div>
                        <div className="text-on-surface-variant flex items-center gap-2 mt-1">
                          <Phone className="w-3 h-3" /> {booking.phone}
                        </div>
                      </td>
                      <td className="p-4 capitalize">
                        {booking.projectType}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-secondary" /> {booking.preferredDate}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-on-surface-variant">
                          <Clock className="w-4 h-4" /> {booking.preferredTime}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-label-sm uppercase tracking-wider ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-4 text-right relative">
                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === booking.id ? null : booking.id)}
                          className="bg-secondary text-primary py-2 px-4 rounded-md text-sm font-label-sm min-w-32 text-center"
                        >
                          {booking.status === 'confirmed' ? 'Confirm' : 
                           booking.status === 'cancelled' ? 'Cancel' : 'Pending'}
                        </button>
                        
                        {openDropdownId === booking.id && (
                          <div className="absolute right-4 mt-2 w-32 bg-surface border border-outline-variant/30 rounded-md shadow-xl py-1 z-50 text-left">
                            <button
                              onClick={() => {
                                updateStatus(booking.id, 'pending');
                                setOpenDropdownId(null);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm font-label-sm transition-colors flex items-center gap-2 ${
                                (booking.status === 'pending' || !booking.status) 
                                  ? 'bg-blue-500 text-white' 
                                  : 'text-primary hover:bg-primary/5'
                              }`}
                            >
                              {(booking.status === 'pending' || !booking.status) && <CheckCircle className="w-4 h-4" />}
                              <span className={!(booking.status === 'pending' || !booking.status) ? "ml-6" : ""}>Pending</span>
                            </button>
                            <button
                              onClick={() => {
                                updateStatus(booking.id, 'confirmed');
                                setOpenDropdownId(null);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm font-label-sm transition-colors flex items-center gap-2 ${
                                booking.status === 'confirmed' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'text-primary hover:bg-primary/5'
                              }`}
                            >
                              {booking.status === 'confirmed' && <CheckCircle className="w-4 h-4" />}
                              <span className={booking.status !== 'confirmed' ? "ml-6" : ""}>Confirm</span>
                            </button>
                            <button
                              onClick={() => {
                                updateStatus(booking.id, 'cancelled');
                                setOpenDropdownId(null);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm font-label-sm transition-colors flex items-center gap-2 ${
                                booking.status === 'cancelled' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'text-primary hover:bg-primary/5'
                              }`}
                            >
                              {booking.status === 'cancelled' && <CheckCircle className="w-4 h-4" />}
                              <span className={booking.status !== 'cancelled' ? "ml-6" : ""}>Cancel</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface p-8 border border-outline-variant/30 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-headline-md text-primary mb-6">Add New Booking</h2>
            <form onSubmit={handleAddBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">First Name *</label>
                  <input type="text" required value={newBooking.firstName} onChange={(e) => setNewBooking({...newBooking, firstName: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary" />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Last Name *</label>
                  <input type="text" required value={newBooking.lastName} onChange={(e) => setNewBooking({...newBooking, lastName: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary" />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Email</label>
                  <input type="email" value={newBooking.email} onChange={(e) => setNewBooking({...newBooking, email: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary" />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Phone *</label>
                  <input type="tel" required value={newBooking.phone} onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary" />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Service *</label>
                  <select required value={newBooking.projectType} onChange={(e) => setNewBooking({...newBooking, projectType: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary">
                    <option value="" disabled>Select</option>
                    <option value="curtains">Custom-made curtains</option>
                    <option value="carpet">Carpet and PVC</option>
                    <option value="wallpaper">Wallpaper installation</option>
                    <option value="blinds">Roller & vertical blinds</option>
                    <option value="parquet">Parquet flooring</option>
                    <option value="sofa">Sofa upholstery</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Date *</label>
                  <input type="date" required value={newBooking.preferredDate} onChange={(e) => setNewBooking({...newBooking, preferredDate: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary" />
                </div>
                <div>
                  <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Time *</label>
                  <select required value={newBooking.preferredTime} onChange={(e) => setNewBooking({...newBooking, preferredTime: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary">
                    <option value="" disabled>Select</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-xs text-on-surface-variant uppercase mb-1">Message / Notes</label>
                <textarea rows={3} value={newBooking.message} onChange={(e) => setNewBooking({...newBooking, message: e.target.value})} className="w-full bg-transparent border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-primary resize-none"></textarea>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="bg-primary text-on-primary px-8 py-3 font-label-sm uppercase tracking-widest hover:bg-secondary inline-flex items-center gap-2 transition-colors">
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
