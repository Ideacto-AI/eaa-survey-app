import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle, CheckCircle, ExternalLink, User, Globe, Sun, Moon } from 'lucide-react';

const EAAComplianceSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('pl');
  const [darkMode, setDarkMode] = useState(false);

  // Translations
  const translations = {
    pl: {
      title: "Ankieta Zgodności z Europejskim Aktem Dostępności",
      subtitle: "Sprawdź, czy Twoja firma musi przestrzegać standardów WCAG 2.1 AA",
      resultsTitle: "Wyniki Ankiety",
      resultsSubtitle: "Zgodność z Europejskim Aktem Dostępności",
      mustComply: "Twoja firma MUSI przestrzegać EAA",
      notMustComply: "Twoja firma NIE MUSI przestrzegać EAA",
      justification: "Uzasadnienie:",
      implementationDeadline: "Termin wdrożenia:",
      wcagRequirements: "Wymagania WCAG 2.1 AA obejmują:",
      nextSteps: "Następne kroki:",
      benefits: "Przydatne zasoby:",
      contactUs: "Skontaktuj się z nami",
      retakeSurvey: "Wypełnij ankietę ponownie",
      question: "Pytanie",
      of: "z",
      previous: "Poprzednie",
      next: "Następne",
      showResults: "Zobacz wyniki",
      disclaimer: "Ta ankieta ma charakter informacyjny. W przypadku wątpliwości skonsultuj się z ekspertami ds. dostępności.",
      fundingTitle: "💰 Dofinansowanie na dostępność",
      fundingText: "Na wdrożenie dostępności cyfrowej można pozyskać dofinansowanie z programów unijnych i krajowych.",
      fundingCta: "Aby uzyskać więcej informacji o dostępnych źródłach finansowania, skontaktuj się z nami."
    },
    en: {
      title: "European Accessibility Act Compliance Survey",
      subtitle: "Check if your company must comply with WCAG 2.1 AA standards",
      resultsTitle: "Survey Results",
      resultsSubtitle: "European Accessibility Act Compliance",
      mustComply: "Your company MUST comply with EAA",
      notMustComply: "Your company does NOT have to comply with EAA",
      justification: "Justification:",
      implementationDeadline: "Implementation deadline:",
      wcagRequirements: "WCAG 2.1 AA requirements include:",
      nextSteps: "Next steps:",
      benefits: "Useful resources:",
      contactUs: "Contact us",
      retakeSurvey: "Retake survey",
      question: "Question",
      of: "of",
      previous: "Previous",
      next: "Next",
      showResults: "Show results",
      disclaimer: "This survey is for informational purposes only. In case of doubt, consult with accessibility experts.",
      fundingTitle: "💰 Accessibility funding",
      fundingText: "Digital accessibility implementation can be funded through EU and national programs.",
      fundingCta: "To get more information about available funding sources, contact us."
    }
  };

  const t = translations[language];

  const questions = {
    pl: [
      {
        id: 'businessType',
        title: 'Rodzaj działalności',
        question: 'Jaki rodzaj działalności prowadzi Twoja firma?',
        type: 'radio',
        options: [
          { value: 'ecommerce', label: 'E-commerce (sprzedaż produktów/usług online)' },
          { value: 'banking', label: 'Usługi bankowe i finansowe' },
          { value: 'transport', label: 'Usługi transportowe/podróżnicze' },
          { value: 'media', label: 'Usługi medialne i komunikacyjne' },
          { value: 'telecom', label: 'Telekomunikacja' },
          { value: 'public', label: 'Sektor publiczny' },
          { value: 'other', label: 'Inne' }
        ],
        tip: {
          title: "⚠️ Ryzyko biznesowe",
          content: "Europejski Akt Dostępności (EAA) to przełomowe prawo UE, które od 28 czerwca 2025 roku wymaga dostępności cyfrowej w kluczowych sektorach gospodarki. Brak zgodności może skutkować karami finansowymi i utratą klientów."
        }
      },
      {
        id: 'companySize',
        title: 'Wielkość firmy',
        question: 'Jak duża jest Twoja firma?',
        type: 'radio',
        options: [
          { value: 'micro', label: 'Mikroprzedsiębiorstwo (do 10 pracowników)' },
          { value: 'small', label: 'Małe przedsiębiorstwo (11-50 pracowników)' },
          { value: 'medium', label: 'Średnie przedsiębiorstwo (51-250 pracowników)' },
          { value: 'large', label: 'Duże przedsiębiorstwo (ponad 250 pracowników)' }
        ],
        tip: {
          title: "🏢 Większe zyski",
          content: "Dostępne strony internetowe zwiększają grono potencjalnych klientów o 4,7 mln Polaków z niepełnosprawnościami (12% populacji). To oznacza dostęp do dodatkowych 1,8 mln gospodarstw domowych o łącznej sile nabywczej przekraczającej 50 mld zł rocznie!"
        }
      },
      {
        id: 'annualTurnover',
        title: 'Obroty roczne',
        question: 'Jakie są roczne obroty Twojej firmy?',
        type: 'radio',
        options: [
          { value: 'under2m', label: 'Poniżej 2 mln EUR' },
          { value: '2m-10m', label: '2-10 mln EUR' },
          { value: '10m-50m', label: '10-50 mln EUR' },
          { value: 'over50m', label: 'Powyżej 50 mln EUR' }
        ],
        tip: {
          title: "💸 Ryzyko kar finansowych",
          content: "Brak zgodności z EAA grozi wysokimi karami! W 2024 roku linia lotnicza Vueling została ukarana grzywną 90 000 EUR za niedostępną stronę internetową."
        }
      },
      {
        id: 'serviceType',
        title: 'Typ usługi cyfrowej',
        question: 'Jaki typ usługi cyfrowej świadczysz?',
        type: 'checkbox',
        options: [
          { value: 'website', label: 'Strona internetowa' },
          { value: 'mobileApp', label: 'Aplikacja mobilna' },
          { value: 'onlineStore', label: 'Sklep internetowy' },
          { value: 'booking', label: 'System rezerwacji' },
          { value: 'banking', label: 'Usługi bankowe online' },
          { value: 'streaming', label: 'Usługi streamingowe' },
          { value: 'communication', label: 'Usługi komunikacyjne' }
        ],
        tip: {
          title: "📈 SEO i dostępność",
          content: "Google uwzględnia dostępność w algorytmach rankingowych! Dostępne strony mają lepsze pozycje w wynikach wyszukiwania, bo są bardziej użyteczne dla wszystkich użytkowników, w tym technologii asystujących."
        }
      },
      {
        id: 'launchDate',
        title: 'Data uruchomienia',
        question: 'Kiedy została uruchomiona Twoja usługa cyfrowa?',
        type: 'radio',
        options: [
          { value: 'before2025', label: 'Przed 28 czerwca 2025' },
          { value: 'after2025', label: 'Po 28 czerwca 2025' },
          { value: 'planning', label: 'Planuję uruchomić w przyszłości' }
        ],
        tip: {
          title: "🚨 Natychmiastowy obowiązek",
          content: "UWAGA! Wszystkie nowe usługi i produkty cyfrowe publikowane po 28 czerwca 2025 muszą od razu spełniać wymagania EAA. Nie ma okresu przejściowego dla nowych rozwiązań - zgodność od pierwszego dnia!"
        }
      },
      {
        id: 'targetAudience',
        title: 'Grupa docelowa',
        question: 'Kto jest główną grupą docelową Twojej usługi?',
        type: 'checkbox',
        options: [
          { value: 'consumers', label: 'Konsumenci indywidualni' },
          { value: 'businesses', label: 'Firmy (B2B)' },
          { value: 'public', label: 'Instytucje publiczne' },
          { value: 'elderly', label: 'Osoby starsze' },
          { value: 'disabled', label: 'Osoby z niepełnosprawnościami' }
        ],
        tip: {
          title: "💰 ROI z dostępności",
          content: "Firmy inwestujące w dostępność osiągają średnio 28% wzrost przychodów! Target zwiększył sprzedaż online o 13% po wdrożeniu WCAG. Dostępne strony mają też niższy bounce rate i wyższą konwersję."
        }
      },
      {
        id: 'euOperations',
        title: 'Działalność w UE',
        question: 'Czy Twoja firma prowadzi działalność w Unii Europejskiej?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Tak, głównie w UE' },
          { value: 'partial', label: 'Tak, częściowo w UE' },
          { value: 'no', label: 'Nie, tylko poza UE' }
        ],
        tip: {
          title: "⚖️ Globalna fala pozwów",
          content: "Dostępność cyfrowa to już rzeczywistość prawna na wielu rynkach! W USA złożono ponad 4000 pozwów o dostępność w 2024 roku. Podobne przepisy obowiązują w Kanadzie (AODA), Australii (DDA) i UK. Firmy globalne muszą być gotowe!"
        }
      }
    ],
    en: [
      {
        id: 'businessType',
        title: 'Business Type',
        question: 'What type of business does your company operate?',
        type: 'radio',
        options: [
          { value: 'ecommerce', label: 'E-commerce (online product/service sales)' },
          { value: 'banking', label: 'Banking and financial services' },
          { value: 'transport', label: 'Transport/travel services' },
          { value: 'media', label: 'Media and communication services' },
          { value: 'telecom', label: 'Telecommunications' },
          { value: 'public', label: 'Public sector' },
          { value: 'other', label: 'Other' }
        ],
        tip: {
          title: "⚠️ Business risk",
          content: "The European Accessibility Act (EAA) is groundbreaking EU legislation requiring digital accessibility in key economic sectors from June 28, 2025. Non-compliance can result in financial penalties and customer loss."
        }
      },
      {
        id: 'companySize',
        title: 'Company Size',
        question: 'How large is your company?',
        type: 'radio',
        options: [
          { value: 'micro', label: 'Microenterprise (up to 10 employees)' },
          { value: 'small', label: 'Small enterprise (11-50 employees)' },
          { value: 'medium', label: 'Medium enterprise (51-250 employees)' },
          { value: 'large', label: 'Large enterprise (over 250 employees)' }
        ],
        tip: {
          title: "🏢 Higher profits",
          content: "Accessible websites increase potential customers by 15% of the population - people with disabilities have a combined purchasing power of over $13 trillion annually! Companies investing in accessibility see average revenue growth of 28%."
        }
      },
      {
        id: 'annualTurnover',
        title: 'Annual Revenue',
        question: 'What is your company\'s annual revenue?',
        type: 'radio',
        options: [
          { value: 'under2m', label: 'Under 2 million EUR' },
          { value: '2m-10m', label: '2-10 million EUR' },
          { value: '10m-50m', label: '10-50 million EUR' },
          { value: 'over50m', label: 'Over 50 million EUR' }
        ],
        tip: {
          title: "💸 Financial penalty risk",
          content: "EAA non-compliance threatens high fines! In 2024, Vueling airline was fined €90,000 for an inaccessible website."
        }
      },
      {
        id: 'serviceType',
        title: 'Digital Service Type',
        question: 'What type of digital service do you provide?',
        type: 'checkbox',
        options: [
          { value: 'website', label: 'Website' },
          { value: 'mobileApp', label: 'Mobile application' },
          { value: 'onlineStore', label: 'Online store' },
          { value: 'booking', label: 'Booking system' },
          { value: 'banking', label: 'Online banking services' },
          { value: 'streaming', label: 'Streaming services' },
          { value: 'communication', label: 'Communication services' }
        ],
        tip: {
          title: "📈 SEO and accessibility",
          content: "Google considers accessibility in ranking algorithms! Accessible sites rank better in search results because they're more usable for all users, including assistive technologies."
        }
      },
      {
        id: 'launchDate',
        title: 'Launch Date',
        question: 'When was your digital service launched?',
        type: 'radio',
        options: [
          { value: 'before2025', label: 'Before June 28, 2025' },
          { value: 'after2025', label: 'After June 28, 2025' },
          { value: 'planning', label: 'Planning to launch in the future' }
        ],
        tip: {
          title: "🚨 Immediate compliance required",
          content: "WARNING! All new digital services and products published after June 28, 2025 must immediately comply with EAA requirements. No transition period for new solutions - compliance from day one!"
        }
      },
      {
        id: 'targetAudience',
        title: 'Target Audience',
        question: 'Who is the main target audience for your service?',
        type: 'checkbox',
        options: [
          { value: 'consumers', label: 'Individual consumers' },
          { value: 'businesses', label: 'Businesses (B2B)' },
          { value: 'public', label: 'Public institutions' },
          { value: 'elderly', label: 'Elderly people' },
          { value: 'disabled', label: 'People with disabilities' }
        ],
        tip: {
          title: "💰 Accessibility ROI",
          content: "Companies investing in accessibility achieve average 28% revenue growth! Target increased online sales by 13% after implementing WCAG. Accessible sites also have lower bounce rates and higher conversion rates."
        }
      },
      {
        id: 'euOperations',
        title: 'EU Operations',
        question: 'Does your company operate in the European Union?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Yes, mainly in the EU' },
          { value: 'partial', label: 'Yes, partially in the EU' },
          { value: 'no', label: 'No, only outside the EU' }
        ],
        tip: {
          title: "⚖️ Global lawsuit wave",
          content: "Digital accessibility is already legal reality in many markets! Over 4,000 accessibility lawsuits were filed in the USA in 2024. Similar laws exist in Canada (AODA), Australia (DDA) and UK. Global companies must be ready!"
        }
      }
    ]
  };

  const handleAnswer = (questionId, value, isCheckbox = false) => {
    if (isCheckbox) {
      const currentAnswers = answers[questionId] || [];
      if (currentAnswers.includes(value)) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter(v => v !== value)
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, value]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: value
      });
    }
  };

  const calculateCompliance = () => {
    let mustComply = false;
    let reasons = [];
    let deadline = '';

    // Sprawdź typ branży
    if (answers.businessType === 'ecommerce' || 
        answers.businessType === 'banking' || 
        answers.businessType === 'transport' || 
        answers.businessType === 'media' || 
        answers.businessType === 'telecom' || 
        answers.businessType === 'public') {
      mustComply = true;
      reasons.push(language === 'pl' ? 'Twoja branża jest objęta Europejskim Aktem Dostępności' : 'Your industry is covered by the European Accessibility Act');
    }

    // Sprawdź typ usługi cyfrowej - WAŻNE: niektóre usługi wymagają zgodności niezależnie od branży
    const serviceTypes = answers.serviceType || [];
    if (serviceTypes.includes('onlineStore')) {
      mustComply = true;
      if (!reasons.some(r => r.includes('branża') || r.includes('industry'))) {
        reasons.push(language === 'pl' ? 'Sklep internetowy jest objęty Europejskim Aktem Dostępności' : 'Online store is covered by the European Accessibility Act');
      }
    }
    if (serviceTypes.includes('banking')) {
      mustComply = true;
      if (!reasons.some(r => r.includes('branża') || r.includes('industry'))) {
        reasons.push(language === 'pl' ? 'Usługi bankowe online są objęte Europejskim Aktem Dostępności' : 'Online banking services are covered by the European Accessibility Act');
      }
    }
    if (serviceTypes.includes('booking')) {
      mustComply = true;
      if (!reasons.some(r => r.includes('branża') || r.includes('industry'))) {
        reasons.push(language === 'pl' ? 'Systemy rezerwacji są objęte Europejskim Aktem Dostępności' : 'Booking systems are covered by the European Accessibility Act');
      }
    }

    // Sprawdź wielkość firmy i obroty - zwolnienie dla mikroprzedsiębiorstw
    if (answers.companySize === 'micro' && answers.annualTurnover === 'under2m') {
      mustComply = false;
      reasons = [language === 'pl' ? 'Mikroprzedsiębiorstwa z obrotami poniżej 2 mln EUR są zwolnione z obowiązku' : 'Microenterprises with revenue below 2 million EUR are exempt from the obligation'];
    }

    // Sprawdź datę uruchomienia dla terminu
    if (answers.launchDate === 'before2025') {
      deadline = language === 'pl' ? '28 czerwca 2030' : 'June 28, 2030';
    } else if (answers.launchDate === 'after2025') {
      deadline = language === 'pl' ? 'Od momentu uruchomienia' : 'From launch date';
    }

    // Sprawdź działalność w UE
    if (answers.euOperations === 'no') {
      mustComply = false;
      reasons = [language === 'pl' ? 'Twoja firma nie prowadzi działalności w UE' : 'Your company does not operate in the EU'];
    }

    return { mustComply, reasons, deadline };
  };

  const nextStep = () => {
    if (currentStep < questions[language].length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSurvey = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const isStepComplete = () => {
    const currentQuestion = questions[language][currentStep];
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    return answer !== undefined;
  };

  const currentQuestions = questions[language];
  const currentQuestion = currentQuestions[currentStep];
  const progress = ((currentStep + 1) / currentQuestions.length) * 100;

  if (showResult) {
    const result = calculateCompliance();
    
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header z przełącznikami */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} w-5 h-5`} />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                  {language === 'pl' ? 'Język:' : 'Language:'}
                </span>
              </div>
              
              {/* Przełącznik języka - przeniesiony na lewą stronę */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLanguage('pl')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'pl'
                      ? (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white')
                      : (darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                  }`}
                >
                  PL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'en'
                      ? (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white')
                      : (darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              {/* Przełącznik dark mode - tylko po prawej stronie */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm">
                  {darkMode ? (language === 'pl' ? 'Jasny' : 'Light') : (language === 'pl' ? 'Ciemny' : 'Dark')}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.resultsTitle}</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.resultsSubtitle}</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 mb-6`}>
            <div className="flex items-center mb-6">
              {result.mustComply ? (
                <AlertCircle className="text-orange-500 mr-3" size={32} />
              ) : (
                <CheckCircle className="text-green-500 mr-3" size={32} />
              )}
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {result.mustComply ? t.mustComply : t.notMustComply}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.justification}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reason}</li>
                  ))}
                </ul>
              </div>

              {result.mustComply && result.deadline && (
                <div>
                  <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.implementationDeadline}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result.deadline}</p>
                </div>
              )}

              {result.mustComply && (
                <div>
                  <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.wcagRequirements}</h3>
                  <ul className={`list-disc pl-5 space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>{language === 'pl' ? 'Dostępność dla osób z niepełnosprawnościami wzroku' : 'Accessibility for people with visual impairments'}</li>
                    <li>{language === 'pl' ? 'Nawigację za pomocą klawiatury' : 'Keyboard navigation'}</li>
                    <li>{language === 'pl' ? 'Czytelne kontrasty kolorów' : 'Readable color contrasts'}</li>
                    <li>{language === 'pl' ? 'Responsywny design' : 'Responsive design'}</li>
                    <li>{language === 'pl' ? 'Alternatywne opisy obrazów' : 'Alternative text for images'}</li>
                    <li>{language === 'pl' ? 'Strukturę semantyczną HTML' : 'Semantic HTML structure'}</li>
                  </ul>
                </div>
              )}

              <div>
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.nextSteps}</h3>
                <div className="space-y-2">
                  {result.mustComply ? (
                    <>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'pl' ? '1. Przeprowadź audyt dostępności swojej strony/aplikacji' : '1. Conduct accessibility audit of your website/application'}
                      </p>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'pl' ? '2. Opracuj plan wdrożenia WCAG 2.1 AA' : '2. Develop WCAG 2.1 AA implementation plan'}
                      </p>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'pl' ? '3. Skonsultuj się z ekspertami ds. dostępności' : '3. Consult with accessibility experts'}
                      </p>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'pl' ? '4. Wdróż niezbędne zmiany przed terminem' : '4. Implement necessary changes before deadline'}
                      </p>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                        {language === 'pl' ? 
                          'Mimo że nie masz obowiązku, wdrożenie standardów dostępności przynosi wymierne korzyści:' :
                          'Although not required, implementing accessibility standards brings tangible benefits:'
                        }
                      </p>
                      <ul className={`list-disc pl-5 space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>
                          <strong>{language === 'pl' ? 'Większa grupa odbiorców' : 'Larger audience'}</strong> - 
                          {language === 'pl' ? ' dostęp do 15% populacji z niepełnosprawnościami' : ' access to 15% of population with disabilities'}
                        </li>
                        <li>
                          <strong>{language === 'pl' ? 'Lepsza pozycja w Google' : 'Better Google ranking'}</strong> - 
                          {language === 'pl' ? ' SEO uwzględnia dostępność w rankingu' : ' SEO considers accessibility in ranking'}
                        </li>
                        <li>
                          <strong>{language === 'pl' ? 'Przewaga konkurencyjna' : 'Competitive advantage'}</strong> - 
                          {language === 'pl' ? ' wyróżnienie się na rynku jako firma inclusive' : ' standing out as an inclusive company'}
                        </li>
                        <li>
                          <strong>{language === 'pl' ? 'Wyższa jakość UX' : 'Higher UX quality'}</strong> - 
                          {language === 'pl' ? ' dostępne strony są bardziej użyteczne dla wszystkich' : ' accessible sites are more usable for everyone'}
                        </li>
                        <li>
                          <strong>{language === 'pl' ? 'Przygotowanie na przyszłość' : 'Future-proofing'}</strong> - 
                          {language === 'pl' ? ' wyprzedzenie ewentualnych zmian prawnych' : ' ahead of potential legal changes'}
                        </li>
                        <li>
                          <strong>{language === 'pl' ? 'Pozytywny wizerunek' : 'Positive image'}</strong> - 
                          {language === 'pl' ? ' budowanie marki odpowiedzialnej społecznie' : ' building socially responsible brand'}
                        </li>
                      </ul>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'pl' ? 
                          'Zalecamy przeprowadzenie podstawowego audytu dostępności, aby zidentyfikować możliwości poprawy.' :
                          'We recommend conducting a basic accessibility audit to identify improvement opportunities.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`${darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 mt-4`}>
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>{t.fundingTitle}</h3>
                <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-2`}>
                  {t.fundingText}
                </p>
                <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                  <strong>{t.fundingCta}</strong>
                </p>
              </div>

              <div>
                <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.benefits}</h3>
                <div className="space-y-2">
                  <a href="https://ec.europa.eu/social/main.jsp?catId=1202" target="_blank" rel="noopener noreferrer" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    <ExternalLink size={16} className="mr-2" />
                    {language === 'pl' ? 'Oficjalna strona Europejskiego Aktu Dostępności' : 'Official European Accessibility Act website'}
                  </a>
                  <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    <ExternalLink size={16} className="mr-2" />
                    {language === 'pl' ? 'Wytyczne WCAG 2.1 AA' : 'WCAG 2.1 AA Guidelines'}
                  </a>
                  <a href="https://www.ideacto.pl/uslugi/audyt-wcag" target="_blank" rel="noopener noreferrer" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    <ExternalLink size={16} className="mr-2" />
                    {language === 'pl' ? 'Audyt dostępności WCAG' : 'WCAG Accessibility Audit'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetSurvey}
                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-700'} text-white px-8 py-3 rounded-lg transition-colors`}
              >
                {t.retakeSurvey}
              </button>
              <a
                href="https://www.ideacto.pl/uslugi/audyt-wcag#contact-heading-anchor"
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? 'bg-gray-900 hover:bg-black' : 'bg-black hover:bg-gray-800'} text-white px-8 py-3 rounded-lg transition-colors flex items-center`}
              >
                <User className="mr-2" size={20} />
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header z przełącznikami */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} w-5 h-5`} />
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                {language === 'pl' ? 'Język:' : 'Language:'}
              </span>
            </div>
            
            {/* Przełącznik języka - na lewej stronie */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage('pl')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'pl'
                    ? (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white')
                    : (darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                }`}
              >
                PL
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  language === 'en'
                    ? (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white')
                    : (darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                }`}
              >
                ENG
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Przełącznik dark mode - tylko po prawej stronie */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm">
                {darkMode ? (language === 'pl' ? 'Jasny' : 'Light') : (language === 'pl' ? 'Ciemny' : 'Dark')}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t.title}
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="mb-6">
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
            <div 
              className={`${darkMode ? 'bg-gray-300' : 'bg-black'} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.question} {currentStep + 1} {t.of} {currentQuestions.length}
          </p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {currentQuestion.title}
            </h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type={currentQuestion.type === 'checkbox' ? 'checkbox' : 'radio'}
                  name={currentQuestion.id}
                  value={option.value}
                  checked={
                    currentQuestion.type === 'checkbox'
                      ? (answers[currentQuestion.id] || []).includes(option.value)
                      : answers[currentQuestion.id] === option.value
                  }
                  onChange={() => handleAnswer(currentQuestion.id, option.value, currentQuestion.type === 'checkbox')}
                  className="mr-3"
                />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{option.label}</span>
              </label>
            ))}
          </div>

          {/* Ramka z ciekawostkami */}
          <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900 border-l-4 border-blue-400' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500'} rounded-lg p-6 mt-8 mb-8`}>
            <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              <span className="mr-2">{currentQuestion.tip.title}</span>
            </h3>
            <p className={`leading-relaxed ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              {currentQuestion.tip.content}
            </p>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              <ChevronLeft className="mr-2" size={20} />
              {t.previous}
            </button>

            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === currentQuestions.length - 1 ? t.showResults : t.next}
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>

        <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EAAComplianceSurvey;