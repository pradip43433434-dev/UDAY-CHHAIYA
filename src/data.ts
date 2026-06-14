import { MockTest, Course, JobAlert, LeaderboardUser } from './types';

export const EXAM_CATEGORIES = [
  "All Exams",
  "GPSC Class 1-2",
  "GSSSB Clerk (CCE)",
  "Gujarat Police",
  "Talati cum Mantri",
  "TET / TAT"
];

export const SUBJECTS_LIST = [
  "All Subjects",
  "Gujarat History & Culture",
  "Gujarati Grammar & Lit",
  "Indian Polity & Constitution",
  "General Mental Ability",
  "General Science & Tech"
];

export const SAMPLE_TESTS: MockTest[] = [
  {
    id: "test-01",
    title: "GPSC Mock Drill: Gujarat Ancient History & Heritage",
    titleGuj: "GPSC મોક ડ્રિલ: ગુજરાતનો પ્રાચીન ઇતિહાસ અને વારસો",
    category: "GPSC Class 1-2",
    durationMinutes: 15,
    totalMarks: 10,
    isFree: true,
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        text: "In which dynasty's reign was the Rani Ki Vav in Patan constructed?",
        textGuj: "પાટણમાં આવેલી રાણકી વાવનું નિર્માણ કઈ રાજવંશના શાસનકાળ દરમિયાન થયું હતું?",
        options: {
          A: "Chaulukya (Solanki) Dynasty",
          B: "Maitrak Dynasty",
          C: "Vaghela Dynasty",
          D: "Chavda Dynasty"
        },
        optionsGuj: {
          A: "ચૌલુક્ય (સોલંકી) વંશ",
          B: "મૈત્રક વંશ",
          C: "વાઘેલા વંશ",
          D: "ચાવડા વંશ"
        },
        correctOption: "A",
        explanation: "Rani Ki Vav was built by Queen Udayamati, spouse of Bhimdev I of the Solanki state (Chaulukya dynasty), during the 11th century.",
        explanationGuj: "રાણકી વાવનું નિર્માણ ૧૧મી સદીમાં સોલંકી શાસક ભીમદેવ પહેલાના પત્ની રાણી ઉદયમતી દ્વારા કરવામાં આવ્યું હતું.",
        subject: "Gujarat History & Culture"
      },
      {
        id: "q2",
        text: "The ancient Harappan archaeological site of Lothal is situated beside which river tributary?",
        textGuj: "પ્રાચીન હડપ્પીય પુરાતત્વીય સ્થળ લોથલ કઈ નદીના કિનારે આવેલું છે?",
        options: {
          A: "Saraswati",
          B: "Bhogavo",
          C: "Sabarmati",
          D: "Narmada"
        },
        optionsGuj: {
          A: "સરસ્વતી",
          B: "ભોગાવો",
          C: "સાબરમતી",
          D: "નર્મદા"
        },
        correctOption: "B",
        explanation: "Lothal is located near the Saragwala village in Dholka Taluka of Ahmedabad district, beside the Bhogavo river, a tributary of the Sabarmati.",
        explanationGuj: "લોથલ અમદાવાદ જિલ્લાના ધોળકા તાલુકાના સરગવાલા સરહદ પાસે સાબરમતીની સહાયક નદી ભોગાવોના કિનારે આવેલું છે.",
        subject: "Gujarat History & Culture"
      },
      {
        id: "q3",
        text: "Who is known as the creator of the famous historic Gujarati work 'Karan Ghelo'?",
        textGuj: "પ્રસિદ્ધ ઐતિહાસિક ગુજરતી નવલકથા 'કરણ ઘેલો' ના લેખક કોણ છે?",
        options: {
          A: "Narmadashankar Dave",
          B: "Govardhanram Tripathi",
          C: "Nandshankar Mehta",
          D: "K. M. Munshi"
        },
        optionsGuj: {
          A: "નર્મદાશંકર દવે",
          B: "ગોવર્ધનરામ ત્રિપાઠી",
          C: "નંદશંકર મહેતા",
          D: "કનૈયાલાલ મુનશી"
        },
        correctOption: "C",
        explanation: "'Karan Ghelo' is widely recognized as the first original novel in Gujarati literature, authored by Nandshankar Tuljashankar Mehta in 1866.",
        explanationGuj: "'કરણ ઘેલો' એ ગુજરાતી સાહિત્યની પ્રથમ મૌલિક નવલકથા ગણાય છે, જે નંદશંકર તુલજાશંકર મહેતા દ્વારા ૧૮૬૬ માં લખાઈ હતી.",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "q4",
        text: "In the context of Solanki architecture, the Sun Temple at Modhera was constructed under whose patronage?",
        textGuj: "સોલંકી શૈલીના પ્રખ્યાત મોઢેરા સૂર્ય મંદિરનું નિર્માણ કોના શાસનમાં થયું હતું?",
        options: {
          A: "Siddharaj Jaisinh",
          B: "Bhimdev I",
          C: "Kumarapala",
          D: "Karandev I"
        },
        optionsGuj: {
          A: "સિદ્ધરાજ જયસિંહ",
          B: "ભીમદેવ પહેલો",
          C: "કુમારપાળ",
          D: "કરણદેવ પહેલો"
        },
        correctOption: "B",
        explanation: "The Sun Temple at Modhera was built during 1026-27 AD during the reign of King Bhimdev I of the Chaulukya/Solanki dynasty.",
        explanationGuj: "મોઢેરાનું સૂર્ય મંદિર ઈસવીસન ૧૦૨૬-૨૭ માં સોલંકી વંશના રાજા ભીમદેવ પહેલાના શાસનકાળ દરમિયાન બંધાયું હતું.",
        subject: "Gujarat History & Culture"
      },
      {
        id: "q5",
        text: "Which Article of the Constitution of India provides for a Public Service Commission for each State?",
        textGuj: "ભારતીય બંધારણની કઈ કલમ હેઠળ દરેક રાજ્ય માટે જાહેર સેવા આયોગ (PSC) ની જોગવાઈ છે?",
        options: {
          A: "Article 312",
          B: "Article 315",
          C: "Article 320",
          D: "Article 324"
        },
        optionsGuj: {
          A: "અનુચ્છેદ ૩૧૨",
          B: "અનુચ્છેદ ૩૧૫",
          C: "અનુચ્છેદ ૩૨૦",
          D: "અનુચ્છેદ ૩૨૪"
        },
        correctOption: "B",
        explanation: "Article 315 of the Constitution of India contains provisions for both the Union Public Service Commission (UPSC) and State Public Service Commissions (like GPSC).",
        explanationGuj: "ભારતીય સંવિધાનના અનુચ્છેદ ૩૧૫ હેઠળ સંઘ તેમજ રાજ્યો માટે જાહેર સેવા આયોગની સ્થાપનાની જોગવાઈ છે.",
        subject: "Indian Polity & Constitution"
      },
      {
        id: "q6",
        text: "Identify the antonym of the Gujarati word: 'આશા' (Aasha / Hope)",
        textGuj: "ગુજરાતી ભાષાના શબ્દ 'આશા' નો વિરોધી શબ્દ ઓળખો:",
        options: {
          A: "નિરાશા (Nirasha / Despair)",
          B: "હતાશા (Hatasha)",
          C: "પ્રત્યાશા (Pratyasha)",
          D: "નિર્મમ (Nirmam)"
        },
        optionsGuj: {
          A: "નિરાશા",
          B: "હતાશા",
          C: "પ્રત્યાશા",
          D: "નિર્મમ"
        },
        correctOption: "A",
        explanation: "The direct exact antonym and standard literary counter-part of 'આશા' in Gujarati grammar is 'નિરાશા'.",
        explanationGuj: "'આશા' નો શુદ્ધ વિરોધી શબ્દ 'નિરાશા' થાય છે.",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "q7",
        text: "At which among the following locations does the Narmada river enter the boundary of Gujarat state?",
        textGuj: "નર્મદા નદી ગુજરાત રાજ્યની સરહદમાં કયા સ્થળેથી પ્રવેશે છે?",
        options: {
          A: "Hapheshwar",
          B: "Kabirvad",
          C: "Bharuch",
          D: "Shoolpaneshwar"
        },
        optionsGuj: {
          A: "હાફેશ્વર",
          B: "કબીરવડ",
          C: "ભરૂચ",
          D: "શૂલપાણેશ્વર"
        },
        correctOption: "A",
        explanation: "The holy Narmada River enters Gujarat near Hapheshwar in the Chhota Udepur district (previously in Kawant taluka).",
        explanationGuj: "પવિત્ર નર્મદા નદી મધ્યપ્રદેશમાંથી આવીને છોટાઉદેપુરમાં કવાંટ તાલુકા નજીક 'હાફેશ્વર' ના કિનારેથી ગુજરાતમાં પ્રવેશ કરે છે.",
        subject: "Gujarat History & Culture"
      },
      {
        id: "q8",
        text: "Complete the Number Series: 4, 9, 25, 49, 121, ?",
        textGuj: "સંખ્યા શ્રેણી પૂર્ણ કરો: 4, 9, 25, 49, 121, ?",
        options: {
          A: "144",
          B: "169",
          C: "196",
          D: "225"
        },
        optionsGuj: {
          A: "144",
          B: "169",
          C: "196",
          D: "225"
        },
        correctOption: "B",
        explanation: "The numbers are squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. The next prime number is 13, and 13^2 = 169.",
        explanationGuj: "આ આપેલા અંકો ક્રમિક અવિભાજ્ય સંખ્યાઓના વર્ગ છે: ૨ નો વર્ગ = ૪, ૩ નો વર્ગ = ૯, ૫ નો વર્ગ = ૨૫, ૭ નો વર્ગ = ૪૯, ૧૧ નો વર્ગ = ૧૨૧. આગામી અવિભાજ્ય સંખ્યા ૧૩ છે, અને ૧૩ નો વર્ગ = ૧૬૯ થાય છે.",
        subject: "General Mental Ability"
      },
      {
        id: "q9",
        text: "Who was the first Chief Minister of Gujarat state?",
        textGuj: "ગુજરાત રાજ્યના સર્વ પ્રથમ મુખ્યમંત્રી કોણ હતા?",
        options: {
          A: "Balwantrai Mehta",
          B: "Dr. Jivraj Narayan Mehta",
          C: "Babubhai Jashbhai Patel",
          D: "Chimanbhai Patel"
        },
        optionsGuj: {
          A: "બળવંતરાય મહેતા",
          B: "ડૉ. જીવરાજ નારાયણ મહેતા",
          C: "બાબુભાઈ જશભાઈ પટેલ",
          D: "ચીમનભાઈ પટેલ"
        },
        correctOption: "B",
        explanation: "Following the Mahagujarat movement and separation on 1st May 1960, Dr. Jivraj Mehta became the pioneer Chief Minister of Gujarat.",
        explanationGuj: "૧ મે ૧૯૬૦ ના રોજ બૃહદ મુંબઈમાંથી અલગ થયા બાદ ગુજરાતના પ્રથમ મુખ્યમંત્રી તરીકે ડૉ. જીવરાજ નારાયણ મહેતાએ શપથ લીધા હતા.",
        subject: "Gujarat History & Culture"
      },
      {
        id: "q10",
        text: "Which gas is principally responsible for the greenhouse effect contributing to global warming?",
        textGuj: "મુખ્યત્વે કયો ગેસ ગ્લોબલ વોર્મિંગમાં ફાળો આપતા ગ્રીનહાઉસ અસર માટે જવાબદાર છે?",
        options: {
          A: "Carbon Dioxide",
          B: "Oxygen",
          C: "Nitrogen",
          D: "Hydrogen"
        },
        optionsGuj: {
          A: "કાર્બન ડાયોક્સાઇડ",
          B: "ઓક્સિજન",
          C: "નાઇટ્રોજન",
          D: "હાઇડ્રોજન"
        },
        correctOption: "A",
        explanation: "Carbon dioxide (CO2) is the primary greenhouse gas emitted through human activities, absorbing and radiating heat inside the atmosphere.",
        explanationGuj: "કાર્બન ડાયોક્સાઇડ (CO2) એ માનવ પ્રવૃત્તિઓ દ્વારા ઉત્સર્જિત થતો પ્રાથમિક ગ્રીનહાઉસ ગેસ છે જે તાપમાન જકડી રાખે છે.",
        subject: "General Science & Tech"
      }
    ]
  },
  {
    id: "test-02",
    title: "GSSSB CCE Master Pack: Gujarati Vyakaran & Samas Class",
    titleGuj: "GSSSB CCE માસ્ટર પેક: ગુજરાતી વ્યાકરણ અને સમાસ શક્તિ",
    category: "GSSSB Clerk (CCE)",
    durationMinutes: 10,
    totalMarks: 5,
    isFree: true,
    difficulty: "Easy",
    questions: [
      {
        id: "g1",
        text: "Identify the 'Samas' type for the following word: 'યથાશક્તિ' (Yathashakti)",
        textGuj: "આપેલા શબ્દ 'યથાશક્તિ' નો સમાસ પ્રકાર ઓળખાવો:",
        options: {
          A: "Dvandva Samas",
          B: "Avyayibhav Samas",
          C: "Tatpurush Samas",
          D: "Karmadharay Samas"
        },
        optionsGuj: {
          A: "દ્વન્દ્વ સમાસ",
          B: "અવ્યયીભાવ સમાસ",
          C: "તત્પુરુષ સમાસ",
          D: "કર્મધારય સમાસ"
        },
        correctOption: "B",
        explanation: "'Yathashakti' begins with 'yatha' which acts as a prefix adverb constraint, declaring it as Avyayibhav Samas.",
        explanationGuj: "'યથાશક્તિ' શબ્દમાં 'યથા' એ અવ્યય હોવાથી તે અવ્યયીભાવ સમાસ બને છે (શક્તિ પ્રમાણે).",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "g2",
        text: "Which of the following is correct sandy-vigrah for 'સદાચાર' (Sadachar)?",
        textGuj: "આપેલા શબ્દોમાંથી 'સદાચાર' ની યોગ્ય સંધિ-વિગ્રહ કઈ છે?",
        options: {
          A: "સદા + આચાર",
          B: "સત્ + આચાર",
          C: "સદ + આચાર",
          D: "સદાય + આચાર"
        },
        optionsGuj: {
          A: "સદા + આચાર",
          B: "સત્ + આચાર",
          C: "સદ + આચાર",
          D: "સદાય + આચાર"
        },
        correctOption: "B",
        explanation: "The rule of Hal-Sandhi applies: 'Sat' + 'Aachara' becomes 'Sadachara' inside Sanskritized Gujarati grammar.",
        explanationGuj: "વ્યંજન સંધિના નિયમ અનુસાર ત્ + આ = દા થાય છે. તેથી સત્ + આચાર = સદાચાર બને છે.",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "g3",
        text: "In Gujarati grammar, what is the 'Kartari' transformation of: 'તેનાથી ચા પીવાઈ'?",
        textGuj: "ગુજરાતી વ્યાકરણમાં 'તેનાથી ચા પીવાઈ' વાક્યનું કર્તરી પ્રયોગ શોધો:",
        options: {
          A: "તેણે ચા પીધી (Tene cha peedhi)",
          B: "તે ચા પીશે (Te cha peeshe)",
          C: "તેના દ્વારા ચા પીવાય છે (Tena dwara cha peevay chhe)",
          D: "તેને ચા પીવડાવાઈ (Tene cha peevdavay)"
        },
        optionsGuj: {
          A: "તેણે ચા પીધી",
          B: "તે ચા પીશે",
          C: "તેના દ્વારા ચા પીવાય છે",
          D: "તેને ચા પીવડાવાઈ"
        },
        correctOption: "A",
        explanation: "The passive/instrumental 'Tenathi' transforms back to subject active agent 'Tene' and action aligned: 'Tene Cha Peedhi'.",
        explanationGuj: "કર્મણિ વાક્ય 'તેનાથી ચા પીવાઈ' નું કર્તરી રૂપાંતર 'તેણે ચા પીધી' થાય છે જેમાં કર્તા પ્રધાન હોય છે.",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "g4",
        text: "Identify the figure of speech (Alankar): 'કાળુનું હૃદય પથ્થર જેવું મધ્યરાત્રિએ બની ગયું'",
        textGuj: "અલંકારનો પ્રકાર ઓળખાવો: 'કાળુનું હૃદય પથ્થર જેવું મક્કમ હતું'",
        options: {
          A: "Rupak",
          B: "Upama",
          C: "Utpreksha",
          D: "Slesh"
        },
        optionsGuj: {
          A: "રૂપક",
          B: "ઉપમા",
          C: "ઉત્પ્રેક્ષા",
          D: "શ્લેષ"
        },
        correctOption: "B",
        explanation: "Using similarity words like 'jevu' (like) creates a direct comparison (Upama Alankar).",
        explanationGuj: "અહીં હૃદયની સરખામણી પથ્થર 'જેવા' સાથે કરવામાં આવી છે. 'જેવું' એ ઉપમાવાચક પદ હોવાથી આ ઉપમા અલંકાર બને છે.",
        subject: "Gujarati Grammar & Lit"
      },
      {
        id: "g5",
        text: "Find the odd one out in the context of famous poets of Gujarat:",
        textGuj: "ગુજરાતના નીચે આપેલા પ્રખ્યાત કવિઓમાંથી કયું નામ જૂથમાં બંધબેસતું નથી?",
        options: {
          A: "Narsinh Mehta",
          B: "Mirabai",
          C: "Akha Bhagat",
          D: "Kalidasa"
        },
        optionsGuj: {
          A: "નરસિંહ મહેતા",
          B: "મીરાંબાઈ",
          C: "અખો ભગત",
          D: "કવિ કાલિદાસ"
        },
        correctOption: "D",
        explanation: "Narsinh Mehta, Mirabai, and Akha are pioneer historical poets of the Gujarati language medieval period, whereas Kalidasa is a classical Sanskrit writer.",
        explanationGuj: "નરસિંહ મહેતા, મીરાંબાઈ અને અખો એ મધ્યકાલીન ગુજરાતી સાહિત્ય યુગના ખ્યાતનામ કવિઓ છે, જ્યારે કાલિદાસ એ સંસ્કૃત યુગના શાસ્ત્રીય કવિ છે.",
        subject: "Gujarati Grammar & Lit"
      }
    ]
  },
  {
    id: "test-03",
    title: "Gujarat Police Constable General Science Diagnostic",
    titleGuj: "ગુજરાત પોલીસ કોન્સ્ટેબલ સામાન્ય વિજ્ઞાન ટેસ્ટ",
    category: "Gujarat Police",
    durationMinutes: 12,
    totalMarks: 5,
    isFree: false,
    difficulty: "Medium",
    questions: [
      {
        id: "p1",
        text: "Which vitamin deficiency causes the disease Rickets in children?",
        textGuj: "કયા વિટામિનની ઊણપથી બાળકોમાં 'સુકાતાન' (Rickets) રોગ થાય છે?",
        options: {
          A: "Vitamin A",
          B: "Vitamin B12",
          C: "Vitamin C",
          D: "Vitamin D"
        },
        optionsGuj: {
          A: "વિટામિન A",
          B: "વિટામિન B12",
          C: "વિટામિન C",
          D: "વિટામિન D"
        },
        correctOption: "D",
        explanation: "Vitamin D assists in calcium absorption. Absence results in Rickets, leading to soft and weak bones.",
        explanationGuj: "કેલ્શિયમ પચાવવા માટે વિટામિન D અત્યંત જરૂરી છે. તેની ઊણપથી સુકાતાન રોગ થઈ જાય છે જેથી હાડકાં નબળા પડે છે.",
        subject: "General Science & Tech"
      },
      {
        id: "p2",
        text: "What is the standard chemical formula of common washing soda?",
        textGuj: "ધોવાના સોડાનું રાસાયણિક સૂત્ર કયું છે?",
        options: {
          A: "NaHCO3",
          B: "Na2CO3",
          C: "NaOH",
          D: "NaCl"
        },
        optionsGuj: {
          A: "NaHCO3 (સોડિયમ બાયકાર્બોનેટ)",
          B: "Na2CO3 (સોડિયમ કાર્બોનેટ)",
          C: "NaOH (સોડિયમ હાઇડ્રોક્સાઇડ)",
          D: "NaCl (સોડિયમ ક્લોરાઇડ)"
        },
        correctOption: "B",
        explanation: "Sodium Carbonate (Na2CO3) is washing soda, while Sodium Bicarbonate (NaHCO3) is baking soda.",
        explanationGuj: "સોડિયમ કાર્બોનેટ (Na2CO3) ને ધોવાનો સોડા કહે છે, જ્યારે સોડિયમ બાયકાર્બોનેટ (NaHCO3) ને ખાવાનો સોડા કહેવાય છે.",
        subject: "General Science & Tech"
      },
      {
        id: "p3",
        text: "Which gland in the human body is referred to as the 'Master Gland'?",
        textGuj: "માનવ શરીરની કઈ ગ્રંથિને 'માસ્ટર ગ્રંથિ' તરીકે ઓળખવામાં આવે છે?",
        options: {
          A: "Thyroid Gland",
          B: "Pituitary Gland",
          C: "Adrenal Gland",
          D: "Pancreas"
        },
        optionsGuj: {
          A: "થાઈરોઈડ ગ્રંથિ",
          B: "પિચ્યુટરી ગ્રંથિ",
          C: "એડ્રિનલ ગ્રંથિ",
          D: "સ્વાદુપિંડ"
        },
        correctOption: "B",
        explanation: "The Pituitary Gland is located at the base of the brain and secretes hormones that control many other endocrine glands.",
        explanationGuj: "પિચ્યુટરી ગ્રંથિ મગજના તળિયે આવેલી હોય છે, જે અન્ય અંતઃસ્ત્રાવી ગ્રંથિઓના સ્ત્રાવનું નિયમન કરતી હોવાથી તેને સાર્વત્રિક માસ્ટર ગ્રંથિ કહે છે.",
        subject: "General Science & Tech"
      },
      {
        id: "p4",
        text: "What is the unit of electric resistance in electrical engineering?",
        textGuj: "વિદ્યુત અવરોધનો એકમ કયો છે?",
        options: {
          A: "Ampere",
          B: "Volt",
          C: "Ohm",
          D: "Watt"
        },
        optionsGuj: {
          A: "એમ્પિયર",
          B: "વોલ્ટ",
          C: "ઓહ્મ",
          D: "વોટ"
        },
        correctOption: "C",
        explanation: "Resistance is measured in Ohms (denoted by Ω), named after German physicist Georg Simon Ohm.",
        explanationGuj: "વાહક તારમાં વિદ્યુત પ્રવાહના માર્ગમાં આવતા અવરોધને ઓહ્મ (Ohm) એકમમાં માપવામાં આવે છે.",
        subject: "General Science & Tech"
      },
      {
        id: "p5",
        text: "Which gas is used in fire extinguishers to put out active fires?",
        textGuj: "લાઈવ આગ ઓલાવવા માટે અગ્નિશામક યંત્રમાં સામાન્ય રીતે કયો ગેસ વપરાય છે?",
        options: {
          A: "Carbon Dioxide",
          B: "Oxygen",
          C: "Carbon Monoxide",
          D: "Helium"
        },
        optionsGuj: {
          A: "કાર્બન ડાયોક્સાઇડ (CO2)",
          B: "ઓક્સિજન",
          C: "કાર્બન મોનોક્સાઇડ",
          D: "હીલિયમ"
        },
        correctOption: "A",
        explanation: "CO2 cuts off oxygen supply around the burning material, suffocating and putting out the fire quickly.",
        explanationGuj: "કાર્બન ડાયોક્સાઇડ ભારે વાયુ હોવાથી આગની આસપાસ એક પડ બનાવે છે જે ઓક્સિજન પૂરવઠો તોડે છે અને આગ ઓલવી નાખે છે.",
        subject: "General Science & Tech"
      }
    ]
  },
  {
    id: "test-04",
    title: "TET / TAT Classroom Aptitude & Child Psychology Quiz",
    titleGuj: "TET / TAT વર્ગવ્યવહાર અને બાળ મનોવિજ્ઞાન મોક ટેસ્ટ",
    category: "TET / TAT",
    durationMinutes: 10,
    totalMarks: 5,
    isFree: false,
    difficulty: "Hard",
    questions: [
      {
        id: "t1",
        text: "Who is recognized as the pioneer father of Behaviourism in psychological science?",
        textGuj: "મનોવિજ્ઞાન ક્ષેત્રે 'વર્તનવાદ' ના પ્રણેતા કોણ ગણાય છે?",
        options: {
          A: "John B. Watson",
          B: "Sigmund Freud",
          C: "Jean Piaget",
          D: "B. F. Skinner"
        },
        optionsGuj: {
          A: "જ્હોન બી. વૉટસન",
          B: "સિગ્મંડ ફ્રોઈડ",
          C: "જીન પિયાજે",
          D: "બી. એફ. સ્કીનર"
        },
        correctOption: "A",
        explanation: "Watson established the psychological school of Behaviourism in 1913, emphasizing observable behaviors over unobservable mental states.",
        explanationGuj: "જે. બી. વોટસન (૧૯૧૩) એ 'વર્તનવાદ' ની સ્થાપના કરી હતી, જેને આધુનિક શિક્ષણશાસ્ત્ર અભ્યાસક્રમમાં વ્યાપક સ્થાન મળ્યું છે.",
        subject: "General Mental Ability"
      },
      {
        id: "t2",
        text: "According to Jean Piaget, 'Cognitive development' transitions through how many distinct biological stages?",
        textGuj: "જીન પિયાજેના મતાનુસાર બાળકનો સંજ્ઞાનાત્મક વિકાસ કેટલા તબક્કામાંથી પસાર થાય છે?",
        options: {
          A: "Three",
          B: "Four",
          C: "Five",
          D: "Six"
        },
        optionsGuj: {
          A: "૩ તબક્કા",
          B: "૪ તબક્કા",
          C: "૫ તબક્કા",
          D: "૬ તબક્કા"
        },
        correctOption: "B",
        explanation: "Jean Piaget proposed four stages of cognitive development: Sensorimotor, Preoperational, Concrete Operational, and Formal Operational.",
        explanationGuj: "પિયાજે સંજ્ઞાનાત્મક વિકાસના ૪ તબક્કા આપ્યા છે: ૧. સંવેદના-ગતિવાહક તબક્કો ૨. પૂર્વ-ક્રિયાત્મક ૩. મૂર્ત-ક્રિયાત્મક ૪. અમૂર્ત ક્રિયાત્મક.",
        subject: "General Mental Ability"
      }
    ]
  }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Complete GPSC General Studies (History, Geography, Polity)",
    titleGuj: "સંપૂર્ણ GPSC સામાન્ય અયન માસ્ટર વિડીયો કોર્સ",
    subject: "Gujarat History & Culture",
    instructor: "Vikrambhai Gohil",
    enrollmentCount: 14500,
    rating: 4.8,
    thumbnailUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400",
    isFree: false,
    lessons: [
      { id: "c1-l1", title: "Introduction & Indus Valley Civilisation (Dholavira)", duration: "45 mins", instructor: "Vikrambhai Gohil", videoUrlSimulated: "https://www.w3schools.com/html/mov_bbb.mp4", isFree: true },
      { id: "c1-l2", title: "Solanki Era and Golden Age of Gujarat Patan", duration: "1 hr 12 mins", instructor: "Vikrambhai Gohil", videoUrlSimulated: "https://www.w3schools.com/html/mov_bbb.mp4", isFree: false },
      { id: "c1-l3", title: "Architecture: Rani Ki Vav, Adalaj & Modhera Style", duration: "55 mins", instructor: "Vikrambhai Gohil", videoUrlSimulated: "https://www.w3schools.com/html/mov_bbb.mp4", isFree: false }
    ]
  },
  {
    id: "course-2",
    title: "Gujarati Grammar & Literature for GSSSB Clerk CCE Exams",
    titleGuj: "ગુજરાતી વ્યાકરણ અને સાહિત્ય સ્પેશિયલ કોર્સ (CCE)",
    subject: "Gujarati Grammar & Lit",
    instructor: "Devangini Patel",
    enrollmentCount: 9800,
    rating: 4.7,
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
    isFree: true,
    lessons: [
      { id: "c2-l1", title: "Kruti & Sahityakar Masters - Medieval to Modern Era", duration: "38 mins", instructor: "Devangini Patel", videoUrlSimulated: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", isFree: true },
      { id: "c2-l2", title: "Samas Types Secrets & Trick Questions", duration: "41 mins", instructor: "Devangini Patel", videoUrlSimulated: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", isFree: true },
      { id: "c2-l3", title: "Chhand & Alankar Masterclass with Examples", duration: "50 mins", instructor: "Devangini Patel", videoUrlSimulated: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", isFree: false }
    ]
  },
  {
    id: "course-3",
    title: "Indian Polity & Constitution Article-wise Revision Pack",
    titleGuj: "ભારતીય બંધારણ અને રાજ્યવ્યવસ્થા મોસ્ટ આઈએમપી આર્ટિકલ્સ",
    subject: "Indian Polity & Constitution",
    instructor: "Rajesh Shah",
    enrollmentCount: 12200,
    rating: 4.9,
    thumbnailUrl: "https://images.unsplash.com/photo-1505664194779-8bebcb95c379?auto=format&fit=crop&q=80&w=400",
    isFree: false,
    lessons: [
      { id: "c3-l1", title: "Fundamental Rights & Duties Explained Simply", duration: "1 hr 5 mins", instructor: "Rajesh Shah", videoUrlSimulated: "https://www.w3schools.com/html/movie.mp4", isFree: true },
      { id: "c3-l2", title: "Directive Principles (DPSP) & Panchayati Raj System", duration: "1 hr 15 mins", instructor: "Rajesh Shah", videoUrlSimulated: "https://www.w3schools.com/html/movie.mp4", isFree: false }
    ]
  }
];

export const MOCK_JOB_ALERTS: JobAlert[] = [
  {
    id: "job-01",
    title: "GPSC Class-1 & Class-2 Administrative Service Recruitment 2026",
    titleGuj: "GPSC વર્ગ ૧ અને વર્ગ ૨ વહીવટી સેવા ભરતી જાહેરાત ૨૦૨૬",
    dept: "Gujarat Public Service Commission",
    advertisementNo: "GPSC/202627/08",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    totalPosts: 182,
    examDateSimulated: "2026-10-18",
    syllabusTopics: [
      "History of India and Gujarat Heritage",
      "Indian Constitution & Parliamentary Working",
      "Physical and Cultural Geography of Saurashtra & Kutch",
      "General Mental Ability & Logical Data Interpretations",
      "Science and Technologies Frontier developments"
    ]
  },
  {
    id: "job-02",
    title: "GSSSB Combined Competitive Examination (CCE) Clerical Grade-III",
    titleGuj: "GSSSB સંયુક્ત સ્પર્ધાત્મક પરીક્ષા (CCE) ક્લાર્ક વર્ગ-૩ ભરતી",
    dept: "Gujarat Secondary Service Selection Board",
    advertisementNo: "GSSSB/202627/45",
    startDate: "2026-05-15",
    endDate: "2026-06-25",
    totalPosts: 4500,
    examDateSimulated: "2026-09-05",
    syllabusTopics: [
      "Gujarati Vyakaran (Grammar)",
      "English Grammar rules & synonyms",
      "Quantitative Aptitude & Time-Work sums",
      "Logical Analytical Ability puzzles",
      "Current Events of National importance"
    ]
  },
  {
    id: "job-03",
    title: "Gujarat Police Sub-Inspector (PSI) and Constable Physical Exam",
    titleGuj: "ગુજરાત પોલીસ સબ-ઇન્સ્પેક્ટર (PSI) અને લોકરક્ષક દળ કોન્સ્ટેબલ ભરૂત",
    dept: "Gujarat Police Recruitment Board (LRD)",
    advertisementNo: "PRB/202627/02",
    startDate: "2026-06-10",
    endDate: "2026-07-10",
    totalPosts: 12500,
    examDateSimulated: "2026-11-23",
    syllabusTopics: [
      "Indian Penal Code (IPC) and Evidence Act (for PSI)",
      "General Knowledge & Current Affairs Daily",
      "Physical Fitness and Running standards",
      "Computer Awareness basics"
    ]
  }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Pratik Chaudhary", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150", score: 985, testsGiven: 32, badge: "GPSC Topper" },
  { rank: 2, name: "Kinjal Dave", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", score: 920, testsGiven: 28, badge: "Master of Gujarati" },
  { rank: 3, name: "Hardik Patel", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150", score: 875, testsGiven: 35, badge: "Math Genius" },
  { rank: 4, name: "Drashti Vyas", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150", score: 810, testsGiven: 21, badge: "Constitution Scholar" },
  { rank: 5, name: "Ravi Solanki", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", score: 790, testsGiven: 24, badge: "Star Performer" }
];
