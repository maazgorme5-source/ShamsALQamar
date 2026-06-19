export interface PortfolioItem {
  id: number;
  category: string;
  src: string;
  title: string;
}

export const categories = [
  "All",
  "Arabic Majlis",
  "Carpets",
  "Motorized Curtains",
  "Parquet",
  "Roller Blinds",
  "Romani Curtains",
  "Sheer Curtains",
  "Sofas",
  "Vertical Blinds",
  "Wallpaper",
  "Chairs"
];

const getImage = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w2000`;

export const portfolioItems: PortfolioItem[] = [
  // Arabic Majlis
  { id: 2, category: "Arabic Majlis", src: getImage("1ldoOsRMJ2Pl-1Lc355Pu6yEVztqU43o7"), title: "Arabic Majlis Project" },
  { id: 3, category: "Arabic Majlis", src: getImage("1wEKTe4Kk5Vzqdz1XhVmE6PNEZLL02UT-"), title: "Arabic Majlis Project" },
  { id: 4, category: "Arabic Majlis", src: getImage("14lBAgfxJkUfZHO9DT-ik4e9Ag-6HpTVj"), title: "Arabic Majlis Project" },
  
  // Carpets
  { id: 5, category: "Carpets", src: getImage("1ynvEKwO0kQr9CTjynnn49Tv1mWkmsoEI"), title: "Carpets Project" },
  { id: 6, category: "Carpets", src: getImage("1_J2Eqj2nmZdaGySHkcfEhgupsW4bTe0F"), title: "Carpets Project" },
  { id: 7, category: "Carpets", src: getImage("1-WfHawrvdEfrdSuLLBzJS3gc4TvCt_Gu"), title: "Carpets Project" },
  { id: 8, category: "Carpets", src: getImage("1JK6KPJx_d1e8d48DSv-an6gOFg13k2rT"), title: "Carpets Project" },
  { id: 9, category: "Carpets", src: getImage("1AkY31bQ6IVxxIrh4NT27XakMbt1rPexT"), title: "Carpets Project" },

  // Motorized curtains
  { id: 10, category: "Motorized Curtains", src: getImage("1K1baRIxpH-SJkJFGzj1AFfZwNUIMUIxW"), title: "Motorized Curtains Project" },
  { id: 11, category: "Motorized Curtains", src: getImage("19skl9FnySqcvt1fuXqgHqBx2apCojYSE"), title: "Motorized Curtains Project" },
  { id: 12, category: "Motorized Curtains", src: getImage("1t3dpHTcdLzXnbsS6MNAgu3eBdO_f2gku"), title: "Motorized Curtains Project" },
  { id: 47, category: "Motorized Curtains", src: getImage("1SVnPRIQ9ADZGzMXYGZ8zprMAG2uWPs3F"), title: "Motorized Curtains Project" },
  
  // Parquet
  { id: 48, category: "Parquet", src: getImage("1SS7RWaiO0S0kfYqJ3FXEr2WzozDxUfl8"), title: "Parquet Project" },
  { id: 49, category: "Parquet", src: getImage("13tTTyfw5kWa3V2vqcstcxk1Fv5z4DwzU"), title: "Parquet Project" },
  { id: 50, category: "Parquet", src: getImage("15nn1eSfYF3dc9K7URU5zR3NFJu6uVFWZ"), title: "Parquet Project" },
  { id: 51, category: "Parquet", src: getImage("1BVDxhIdArpqcFNeZ3_XWEplXE5tRQ4wx"), title: "Parquet Project" },
  { id: 52, category: "Parquet", src: getImage("1ronmP5F2heIfd6LjzA2ZQYTFkiRqA0H-"), title: "Parquet Project" },
  { id: 53, category: "Parquet", src: getImage("11TvIPpNn7q98jE6DiA8CmeoUcqj3sdsV"), title: "Parquet Project" },
  { id: 54, category: "Parquet", src: getImage("12RecMRULJrsuVxS1012Bzx6WhETYDqmz"), title: "Parquet Project" },
  { id: 55, category: "Parquet", src: getImage("1uTMsNVz0sjVTJA0qW59IT_WxrcZfqNeg"), title: "Parquet Project" },
  { id: 56, category: "Parquet", src: getImage("1P0J4Yu6atJWC2dRQh5iYzPhzHUkf5qSH"), title: "Parquet Project" },
  { id: 57, category: "Parquet", src: getImage("1Fxdag4_ZLVNtpYVgQO15d6QOW11ayLzA"), title: "Parquet Project" },
  { id: 58, category: "Parquet", src: getImage("1NFnKIBpRk5hWkykdBt-T3ys-0lw9lmHA"), title: "Parquet Project" },
  { id: 59, category: "Parquet", src: getImage("1p5iuP2OiQG1Y5Q0sJBLjTS1zPWtXJdaH"), title: "Parquet Project" },
  { id: 60, category: "Parquet", src: getImage("1LQfj1GLf2EA2hO-ZDTWWHzIkFn5sZi_5"), title: "Parquet Project" },
  { id: 61, category: "Parquet", src: getImage("1xOr9nP_WuwoDl19NTYSzqu0wFk-iqFs3"), title: "Parquet Project" },
  
  // Roller Blinds
  { id: 14, category: "Roller Blinds", src: getImage("1t-hKvPKuP__TQ05245yYZF0VLU6fqdfd"), title: "Roller Blinds Project" },
  
  // Romani Curtains
  { id: 62, category: "Romani Curtains", src: getImage("1UCOY4YPE92XBTDZdhRWUVN1rW-UySVIR"), title: "Romani Curtains Project" },
  { id: 64, category: "Romani Curtains", src: getImage("1VqjGCTw4ytz4YfebTc5GgV_XAmVO0lF5"), title: "Romani Curtains Project" },
  { id: 63, category: "Romani Curtains", src: getImage("1aD3hOSMAnyI7KdN4OX2X07SvCEJQkBbx"), title: "Romani Curtains Project" },
  { id: 66, category: "Romani Curtains", src: getImage("1hIAIj056eLGPJPiWCA7hulxOSt9YtSZm"), title: "Romani Curtains Project" },
  { id: 65, category: "Romani Curtains", src: getImage("1l2Swk_pgSTVY1484FMNCy2HdgOxeDvis"), title: "Romani Curtains Project" },
  { id: 67, category: "Romani Curtains", src: getImage("1vXHxEEzXHLdCnAkQXOAc2QZVmleY-T0t"), title: "Romani Curtains Project" },
  { id: 15, category: "Romani Curtains", src: getImage("1_2y9a9hn879U2V04Px6r4DuLDIKlaRLj"), title: "Romani Curtains Project" },
  { id: 16, category: "Romani Curtains", src: getImage("1kMh8jKvrPXjlDK4eyhGspIvnSYRi2sJw"), title: "Romani Curtains Project" },
  
  // Sheer Curtains
  { id: 17, category: "Sheer Curtains", src: getImage("1m6jhTyPuh2SHkFMRgO0R8umegiOkJ9Qi"), title: "Sheer Curtains Project" },
  { id: 18, category: "Sheer Curtains", src: getImage("1ZJU7LJEgS7kPlFIb6KmKfszG1o-MtxfM"), title: "Sheer Curtains Project" },
  { id: 19, category: "Sheer Curtains", src: getImage("1LCHAteFx49ANxoYMuNqqtjcJfwJnv0bf"), title: "Sheer Curtains Project" },
  { id: 20, category: "Sheer Curtains", src: getImage("12VGqb2jyJ0QHjjlUpnJ0BzzM-9R23CIl"), title: "Sheer Curtains Project" },
  
  // Sofas
  { id: 21, category: "Sofas", src: getImage("14DtL52c_NPVXSpmdUpYuNQQgahy9RemX"), title: "Sofas Project" },
  { id: 22, category: "Sofas", src: getImage("1jtnNpBcXKDzhUvcYGrloGdrV446UJO2Q"), title: "Sofas Project" },
  { id: 23, category: "Sofas", src: getImage("1RcREVyFYOJ8Vz_OjS6JTtpTaDgUAiXNU"), title: "Sofas Project" },
  { id: 24, category: "Sofas", src: getImage("1k5TMfskDou8GCbWIWvcg6kIReBeupY6N"), title: "Sofas Project" },
  { id: 25, category: "Sofas", src: getImage("15XzZ9U2w6TM7Bd18rWDcD5PL93FUxu5o"), title: "Sofas Project" },
  { id: 26, category: "Sofas", src: getImage("14zNQcat7hx8j8iP29LTI-grRtIrRWAma"), title: "Sofas Project" },
  { id: 27, category: "Sofas", src: getImage("1Gf-By-T4PlBAMkwlJAQZ_d5RDZC0Mmsr"), title: "Sofas Project" },
  { id: 28, category: "Sofas", src: getImage("1Ekg-zK2M0dYo0hv5N2JRpu2N5yIPh3se"), title: "Sofas Project" },
  { id: 29, category: "Sofas", src: getImage("14RaLCfkgEGLpEBBpSTOzJR0ZNre9HXYr"), title: "Sofas Project" },
  { id: 30, category: "Sofas", src: getImage("1cZk-QRSsn7BCsoD34PJrdxCj8xmlT0H3"), title: "Sofas Project" },
  { id: 31, category: "Sofas", src: getImage("1ZAJVUtjZv5VcuiRiHBrV_HHsmxZutEQP"), title: "Sofas Project" },
  
  // Vertical Blinds
  { id: 32, category: "Vertical Blinds", src: getImage("1-OKOjdBhONDg7B4y3HYafkFSpxRQkWRs"), title: "Vertical Blinds Project" },
  
  // Wallpaper
  { id: 34, category: "Wallpaper", src: getImage("1LD7pbOKKOBFixGssP80fHe1peukqJ_uh"), title: "Wallpaper Project" },
  { id: 35, category: "Wallpaper", src: getImage("1OJCRc3d7F7zoQuLbQQgKA-cqWRMBCKAW"), title: "Wallpaper Project" },
  { id: 36, category: "Wallpaper", src: getImage("1x3XY1vYKeEA7i2sO4nNlQH8UXI3YBenR"), title: "Wallpaper Project" },
  { id: 37, category: "Wallpaper", src: getImage("14e0-xmhlWJ8jKDh_UebRBrj0rTTDP9gP"), title: "Wallpaper Project" },
  { id: 38, category: "Wallpaper", src: getImage("1Mw6EiGJaZJf2hgI67j_sVKJIGGxHc8Hg"), title: "Wallpaper Project" },
  { id: 39, category: "Wallpaper", src: getImage("1pifhL9TWNIK3628rxkLZeZEKhk_4Vd5P"), title: "Wallpaper Project" },
  { id: 40, category: "Wallpaper", src: getImage("1VRScMaGkNWyfx75N5vIAoMeIQMy99Rvq"), title: "Wallpaper Project" },
  { id: 41, category: "Wallpaper", src: getImage("1Rrogj1AsP6Y8Hcl5pplL-BVLRPdoC7pO"), title: "Wallpaper Project" },
  { id: 42, category: "Wallpaper", src: getImage("1YLSkGCGGOm-3FDvJFVxjInDOmkSEJfd2"), title: "Wallpaper Project" },
  { id: 43, category: "Wallpaper", src: getImage("12yeG1hp2I2dwxgFf1qWWKAFMuC2QDR6S"), title: "Wallpaper Project" },
  { id: 44, category: "Wallpaper", src: getImage("1LSU7QLS6QCbxiY6QgZJzVcOWmpQW9mxU"), title: "Wallpaper Project" },
  { id: 45, category: "Wallpaper", src: getImage("1xwf402dd98-opXHTc8AeQ3-Skr09M1mG"), title: "Wallpaper Project" },
  
  // Chairs
  { id: 46, category: "Chairs", src: getImage("1W3giToAJEZFgrCxGT23--FJZP8VRigWH"), title: "Chairs Project" }
];
