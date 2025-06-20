import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet,faCirclePlus,faUser,faChartSimple,faCoins} from '@fortawesome/free-solid-svg-icons';
import {faCircleUser} from '@fortawesome/free-regular-svg-icons';

const sections = [
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCirclePlus} />
         &nbsp; Account Opening
      </span>
    ),
    links: [
      "Resident individual",
      "Minor",
      "Non Resident Indian (NRI)",
      "Company, Partnership, HUF and LLP",
      "Glossary",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faUser} />
        &nbsp;Your Zerodha Account
      </span>
    ),
    links: [
      "Your Profile",
      "Account modification",
      "Client Master Report (CMR) and Depository Participant (DP)",
      "Nomination",
      "Transfer and conversion of securities",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faChartSimple} />
        &nbsp;Kite
      </span>
    ),
    links: [
      "IPO",
      "Trading FAQs",
      "Margin Trading Facility (MTF) and Margins",
      "Charts and orders",
      "Alerts and Nudges",
      "General",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faWallet} />
        &nbsp;Funds
      </span>
    ),
    links: [
        "Add money", 
        "Withdraw money", 
        "Add bank accounts", 
        "eMandates"
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCircleUser} rotation={90} />
        &nbsp;Console
      </span>
    ),
    links: [
      "Portfolio",
      "Corporate actions",
      "Funds statement",
      "Reports",
      "Profile",
      "Segments",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCoins} />
        &nbsp;Coin
      </span>
    ),
    links: [
      "Understanding mutual funds and Coin",
      "Coin app",
      "Coin web",
      "Transactions and reports",
      "National Pension Scheme (NPS)",
    ],
  },
];


export default function SupportGrid() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-xl font-[450] mb-9 text-[#666666]">
        To create a ticket, select a relevant topic
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 mx-1 md:mx-3">
        {sections.map((section,index) => (
          <div key={index}>
            <h3 style={{ fontWeight: 450 }}
                className="text-black mb-5 cursor-pointer hover:text-blue-600 text-lg font-semibold"
            >
                {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="mx-1 md:mx-6 text-[#4484d2] cursor-pointer hover:text-black mb-2 text-sm"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
