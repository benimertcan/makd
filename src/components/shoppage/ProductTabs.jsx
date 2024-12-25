import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ProductTabs = ({ description, additionalInfo, reviews }) => {
    const [activeTab, setActiveTab] = useState('description');

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'additional', label: 'Additional Information' },
        { id: 'reviews', label: `Reviews (${reviews?.length || 0})` }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            {description}
                        </p>
                        <p className="text-gray-600">
                            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                        </p>
                        <p className="text-gray-600">
                            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                        </p>
                    </div>
                );
            case 'additional':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">the quick fox jumps over</h3>
                        <div className="space-y-2">
                            {[1,2,3,4].map((_, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-600">
                                    <ChevronRight className="size-5" />
                                    <p>the quick fox jumps over the lazy dog</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-semibold mt-8">the quick fox jumps over</h3>
                        <div className="space-y-2">
                            {[1,2,3].map((_, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-600">
                                    <ChevronRight className="size-5" />
                                    <p>the quick fox jumps over the lazy dog</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">the quick fox jumps over</h3>
                        <div className="space-y-2">
                            {[1,2,3,4].map((_, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-600">
                                    <ChevronRight className="size-5" />
                                    <p>the quick fox jumps over the lazy dog</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="border-t border-gray-200">
            <div className="flex gap-8 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-2 font-medium text-sm transition-colors relative
                            ${activeTab === tab.id 
                                ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-blue' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="py-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProductTabs;
