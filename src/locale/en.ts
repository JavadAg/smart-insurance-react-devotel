// locales/en.ts
export default {
  notFound: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has been deleted.",
    backToHome: "Back to home"
  },
  error: {
    title: "Something went wrong",
    description: "Please try again",
    tryAgain: "Try again"
  },
  darkModeToggle: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
    system: "System"
  },
  home: {
    title: "Welcome to Smart Insurance",
    apply: {
      title: "Apply for Insurance",
      description:
        "Start a new insurance application with our dynamic form system."
    },
    applications: {
      title: "View Applications",
      description:
        "Manage and track your insurance applications in a customizable list view."
    }
  },
  applications: {
    title: "Applications",
    columns: "Columns",
    noResults: "No results.",
    previous: "Previous",
    next: "Next"
  },
  insuranceForms: {
    title: "Insurance Form",
    selectForm: "Select a form",
    sending: "Sending...",
    sendApplication: "Send Application"
  }
} as const
