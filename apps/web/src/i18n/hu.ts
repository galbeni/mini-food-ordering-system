export const hu = {
  app: {
    name: "Mini Food",
    description: "Mini Food rendelési rendszer",
  },
  nav: {
    login: "Belépés",
    register: "Regisztráció",
    logout: "Kilépés",
  },
  auth: {
    login: {
      title: "Belépés",
      description: "Jelentkezz be az ételrendeléshez.",
      email: "Email",
      password: "Jelszó",
      submit: "Belépés",
      submitting: "Belépés...",
      noAccount: "Még nincs fiókod?",
      register: "Regisztráció",
      error: "Hibás email vagy jelszó.",
    },
    register: {
      title: "Fiók létrehozása",
      description: "Regisztrálj vásárlóként a rendeléshez.",
      name: "Név",
      email: "Email",
      password: "Jelszó",
      submit: "Regisztráció",
      submitting: "Fiók létrehozása...",
      hasAccount: "Már van fiókod?",
      login: "Belépés",
      error: "A regisztráció sikertelen. Lehet, hogy az email már foglalt.",
    },
  },
  restaurants: {
    title: "Éttermek",
    eyebrow: "Mini Food rendelés",
    description:
      "Böngészd az éttermeket, adj ételeket a kosárhoz, majd add le a rendelést.",
    loading: "Éttermek betöltése...",
    error:
      "Nem sikerült betölteni az éttermeket. Ellenőrizd, hogy fut-e az API.",
    viewMenu: "Menü megtekintése",
  },
  restaurantDetail: {
    back: "← Vissza az éttermekhez",
    loading: "Étterem betöltése...",
    error: "Nem sikerült betölteni az éttermet.",
    eyebrow: "Étterem",
    menu: "Menü",
    cart: {
      title: "Kosarad",
      description: "Ehhez a beadandóhoz elegendő a lokális kosár state.",
      empty: "A kosarad üres.",
      total: "Összesen",
      placeOrder: "Rendelés leadása",
      placingOrder: "Rendelés leadása...",
      loginHint: "Rendelés leadásához be kell jelentkezned.",
      error:
        "Nem sikerült leadni a rendelést. Jelentkezz be, majd próbáld újra.",
    },
  },
  orderDetail: {
    back: "← Vissza az éttermekhez",
    loading: "Rendelés betöltése...",
    unavailableTitle: "A rendelés nem érhető el",
    unavailableDescription:
      "Jelentkezz be, vagy ellenőrizd, hogy a rendelés ehhez a fiókhoz tartozik-e.",
    placed: "Rendelés leadva",
    orderId: "Rendelés azonosító",
    restaurant: "Étterem",
    items: "Tételek",
    total: "Összesen",
  },
} as const;
