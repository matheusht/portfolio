import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const SecurityBadges: React.FC = () => {
  const [blockedAttacks, setBlockedAttacks] = React.useState(427);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBlockedAttacks((prev: number) => prev + Math.floor(Math.random() * 3));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-[#0A192F] border-t border-gray-2Matheus Theodoro00 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm dark:text-white">
                OWASP Top 10 Compliant
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm dark:text-white">
                Last scan passed: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-accent animate-pulse" />
              <span className="text-sm dark:text-white">
                Blocked Attacks: {blockedAttacks}
              </span>
            </div>
            <a
              href="#report-vulnerability"
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report a Vulnerability</span>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SecurityBadges;