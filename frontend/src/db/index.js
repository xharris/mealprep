export const getWelcomeText = () => fetch("http://localhost:3000/api").then(res => res.text())