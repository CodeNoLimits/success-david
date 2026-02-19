const fs = require('fs');
const path = require('path');

const translations = {
  fr: { label: "Ils nous font confiance", title: "11 clients actifs | +82 projets | 5 langues" },
  en: { label: "They trust us", title: "11 active clients | 82+ projects | 5 languages" },
  he: { label: "הם סומכים עלינו", title: "11 לקוחות פעילים | +82 פרויקטים | 5 שפות" },
  es: { label: "Ellos confían en nosotros", title: "11 clientes activos | +82 proyectos | 5 idiomas" },
  ru: { label: "Они доверяют нам", title: "11 активных клиентов | 82+ проектов | 5 языков" }
};

for (const lang in translations) {
  const filePath = path.join(__dirname, 'lang', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.clients = translations[lang];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${lang}.json`);
  }
}
