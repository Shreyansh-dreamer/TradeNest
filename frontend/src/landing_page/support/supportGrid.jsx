import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCirclePlus, faUser, faChartSimple, faCoins } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const sections = [
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCirclePlus} />
        &nbsp; Opening an Account
      </span>
    ),
    links: [
      "Individual (Resident)",
      "Minor account",
      "NRI account",
      "Company, Partnership, HUF & LLP",
      "Terms & glossary",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faUser} />
        &nbsp; Your TradeNest Account
      </span>
    ),
    links: [
      "Update your profile",
      "Account modification requests",
      "CMR and Depository Participant (DP)",
      "Nomination & DDPI",
      "Transfer & conversion of holdings",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faChartSimple} />
        &nbsp; Nexus (Trading Platform)
      </span>
    ),
    links: [
      "IPO applications",
      "Trading FAQs",
      "Margins & MTF",
      "Charts, orders & positions",
      "Alerts & smart nudges",
      "General queries",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faWallet} />
        &nbsp; Funds & Payments
      </span>
    ),
    links: [
        "Add money",
        "Withdraw funds",
        "Manage bank accounts",
        "Set up eMandates",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCircleUser} rotation={90} />
        &nbsp; Ledger (Back Office)
      </span>
    ),
    links: [
      "Portfolio overview",
      "Corporate actions",
      "Fund statement",
      "Tax & compliance reports",
      "Profile & segments",
    ],
  },
  {
    title: (
      <span>
        <FontAwesomeIcon icon={faCoins} />
        &nbsp; Invest (Mutual Funds)
      </span>
    ),
    links: [
      "Mutual fund basics",
      "Using the Invest app",
      "Invest via browser",
      "Transaction history & reports",
      "National Pension Scheme (NPS)",
    ],
  },
];


export default function SupportGrid() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-xl font-normal mb-9 text-gray-500 dark:text-gray-400">
        Select a topic below to raise a support ticket
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 mx-1 md:mx-3">
        {sections.map((section, index) => (
          <div key={index}>
            <h3
              style={{ fontWeight: 450 }}
              className="text-gray-800 dark:text-gray-200 mb-5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 text-lg font-semibold transition-colors"
            >
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="mx-1 md:mx-6 text-blue-500 dark:text-blue-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 mb-2 text-sm transition-colors"
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
