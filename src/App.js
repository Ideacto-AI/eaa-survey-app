import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, FileText, AlertCircle, CheckCircle, ExternalLink, Send, User } from 'lucide-react';

const EAAComplianceSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    website: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const questions = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

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
      reasons.push('Twoja branża jest objęta Europejskim Aktem Dostępności');
    }

    // Sprawdź typ usługi cyfrowej - WAŻNE: niektóre usługi wymagają zgodności niezależnie od branży
    const serviceTypes = answers.serviceType || [];
    if (serviceTypes.includes('onlineStore')) {
      mustComply = true;
      if (!reasons.includes('Twoja branża jest objęta Europejskim Aktem Dostępności')) {
        reasons.push('Sklep internetowy jest objęty Europejskim Aktem Dostępności');
      }
    }
    if (serviceTypes.includes('banking')) {
      mustComply = true;
      if (!reasons.includes('Twoja branża jest objęta Europejskim Aktem Dostępności')) {
        reasons.push('Usługi bankowe online są objęte Europejskim Aktem Dostępności');
      }
    }
    if (serviceTypes.includes('booking')) {
      mustComply = true;
      if (!reasons.includes('Twoja branża jest objęta Europejskim Aktem Dostępności')) {
        reasons.push('Systemy rezerwacji są objęte Europejskim Aktem Dostępności');
      }
    }

    // Sprawdź wielkość firmy i obroty - zwolnienie dla mikroprzedsiębiorstw
    if (answers.companySize === 'micro' && answers.annualTurnover === 'under2m') {
      mustComply = false;
      reasons = ['Mikroprzedsiębiorstwa z obrotami poniżej 2 mln EUR są zwolnione z obowiązku'];
    }

    // Sprawdź datę uruchomienia dla terminu
    if (answers.launchDate === 'before2025') {
      deadline = '28 czerwca 2030';
    } else if (answers.launchDate === 'after2025') {
      deadline = 'Od momentu uruchomienia';
    }

    // Sprawdź działalność w UE
    if (answers.euOperations === 'no') {
      mustComply = false;
      reasons = ['Twoja firma nie prowadzi działalności w UE'];
    }

    return { mustComply, reasons, deadline };
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('firstName', contactData.firstName);
      formData.append('lastName', contactData.lastName);
      formData.append('company', contactData.company);
      formData.append('email', contactData.email);
      formData.append('website', contactData.website);
      formData.append('message', contactData.message || 'Prośba o kontakt w sprawie Europejskiego Aktu Dostępności');

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setShowContactForm(false);
          setFormSubmitted(false);
          setContactData({
            firstName: '',
            lastName: '',
            company: '',
            email: '',
            website: '',
            message: ''
          });
        }, 3000);
      } else {
        throw new Error('Błąd serwera');
      }
    } catch (error) {
      setSubmitError('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactChange = (field, value) => {
    setContactData({
      ...contactData,
      [field]: value
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
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
    setShowContactForm(false);
  };

  const isStepComplete = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    return answer !== undefined;
  };

  if (showResult) {
    const result = calculateCompliance();
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wyniki Ankiety</h1>
          <p className="text-gray-600">Zgodność z Europejskim Aktem Dostępności</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center mb-6">
            {result.mustComply ? (
              <AlertCircle className="text-orange-500 mr-3" size={32} />
            ) : (
              <CheckCircle className="text-green-500 mr-3" size={32} />
            )}
            <h2 className="text-2xl font-bold">
              {result.mustComply ? 
                'Twoja firma MUSI przestrzegać EAA' : 
                'Twoja firma NIE MUSI przestrzegać EAA'
              }
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Uzasadnienie:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="text-gray-700">{reason}</li>
                ))}
              </ul>
            </div>

            {result.mustComply && result.deadline && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Termin wdrożenia:</h3>
                <p className="text-gray-700">{result.deadline}</p>
              </div>
            )}

            {result.mustComply && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Wymagania WCAG 2.1 AA obejmują:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Dostępność dla osób z niepełnosprawnościami wzroku</li>
                  <li>Nawigację za pomocą klawiatury</li>
                  <li>Czytelne kontrasty kolorów</li>
                  <li>Responsywny design</li>
                  <li>Alternatywne opisy obrazów</li>
                  <li>Strukturę semantyczną HTML</li>
                </ul>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-lg mb-2">Następne kroki:</h3>
              <div className="space-y-2">
                {result.mustComply ? (
                  <>
                    <p className="text-gray-700">1. Przeprowadź audyt dostępności swojej strony/aplikacji</p>
                    <p className="text-gray-700">2. Opracuj plan wdrożenia WCAG 2.1 AA</p>
                    <p className="text-gray-700">3. Skonsultuj się z ekspertami ds. dostępności</p>
                    <p className="text-gray-700">4. Wdróż niezbędne zmiany przed terminem</p>
                  </>
                ) : (
                  <div className="space-y-3">
                    <p className="text-gray-700 font-medium">Mimo że nie masz obowiązku, wdrożenie standardów dostępności przynosi wymierne korzyści:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li><strong>Większa grupa odbiorców</strong> - dostęp do 15% populacji z niepełnosprawnościami</li>
                      <li><strong>Lepsza pozycja w Google</strong> - SEO uwzględnia dostępność w rankingu</li>
                      <li><strong>Przewaga konkurencyjna</strong> - wyróżnienie się na rynku jako firma inclusive</li>
                      <li><strong>Wyższa jakość UX</strong> - dostępne strony są bardziej użyteczne dla wszystkich</li>
                      <li><strong>Przygotowanie na przyszłość</strong> - wyprzedzenie ewentualnych zmian prawnych</li>
                      <li><strong>Pozytywny wizerunek</strong> - budowanie marki odpowiedzialnej społecznie</li>
                    </ul>
                    <p className="text-gray-700">Zalecamy przeprowadzenie podstawowego audytu dostępności, aby zidentyfikować możliwości poprawy.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">💰 Dofinansowanie na dostępność</h3>
              <p className="text-blue-700 mb-2">
                Na wdrożenie dostępności cyfrowej można pozyskać dofinansowanie z programów unijnych i krajowych.
              </p>
              <p className="text-blue-700">
                <strong>Aby uzyskać więcej informacji o dostępnych źródłach finansowania, skontaktuj się z nami.</strong>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Przydatne zasoby:</h3>
              <div className="space-y-2">
                <a href="https://ec.europa.eu/social/main.jsp?catId=1202" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={16} className="mr-2" />
                  Oficjalna strona Europejskiego Aktu Dostępności
                </a>
                <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={16} className="mr-2" />
                  Wytyczne WCAG 2.1 AA
                </a>
                <a href="https://www.ideacto.pl/uslugi/audyt-wcag" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                  <ExternalLink size={16} className="mr-2" />
                  Audyt dostępności WCAG
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetSurvey}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Wypełnij ankietę ponownie
            </button>
            <a
              href="https://www.ideacto.pl/uslugi/audyt-wcag#contact-heading-anchor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            >
              <User className="mr-2" size={20} />
              Skontaktuj się z nami
            </a>
          </div>
        </div>

        {/* Formularz kontaktowy dla Netlify */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Skontaktuj się z nami</h3>
              
              {formSubmitted ? (
                <div className="text-center">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                  <p className="text-green-600 font-semibold">Dziękujemy za kontakt!</p>
                  <p className="text-gray-600 mt-2">Odpowiemy w ciągu 24 godzin.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imię *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={contactData.firstName}
                        onChange={(e) => handleContactChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nazwisko *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={contactData.lastName}
                        onChange={(e) => handleContactChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Firma *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={contactData.company}
                      onChange={(e) => handleContactChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres e-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={contactData.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adres strony internetowej
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={contactData.website}
                      onChange={(e) => handleContactChange('website', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dodatkowa wiadomość
                    </label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={(e) => handleContactChange('message', e.target.value)}
                      rows="3"
                      placeholder="Opisz swoje potrzeby lub zadaj pytania..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {submitError && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      disabled={isSubmitting}
                    >
                      Anuluj
                    </button>
                    <button
                      type="button"
                      onClick={handleContactSubmit}
                      className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={16} />
                          Wyślij
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Ankieta Zgodności z Europejskim Aktem Dostępności
        </h1>
        <p className="text-gray-600">
          Sprawdź, czy Twoja firma musi przestrzegać standardów WCAG 2.1 AA
        </p>
      </div>

      <div className="mb-6">
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Pytanie {currentStep + 1} z {questions.length}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-gray-600">
            {currentQuestion.question}
          </p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
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
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="mr-2" size={20} />
            Poprzednie
          </button>

          <button
            onClick={nextStep}
            disabled={!isStepComplete()}
            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === questions.length - 1 ? 'Zobacz wyniki' : 'Następne'}
            <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Ta ankieta ma charakter informacyjny. W przypadku wątpliwości skonsultuj się z ekspertami ds. dostępności.
        </p>
      </div>
    </div>
  );
};

export default EAAComplianceSurvey;