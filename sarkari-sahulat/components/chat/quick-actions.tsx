'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Calculator, FileText, ExternalLink } from 'lucide-react';

interface QuickAction {
    type: string;
    label: string;
    data: Record<string, any>;
}

interface QuickActionsProps {
    actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
    const router = useRouter();

    const handleAction = (action: QuickAction) => {
        switch (action.type) {
            case 'find_office':
                router.push('/offices');
                break;
            case 'calculate_fee':
                router.push('/tools/calculator');
                break;
            case 'view_checklist':
                router.push('/tools/checklist');
                break;
            case 'view_service':
                if (action.data.serviceSlug) {
                    router.push(`/services/${action.data.serviceSlug}`);
                }
                break;
            default:
                console.warn('Unknown action type:', action.type);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'find_office':
                return <MapPin className="w-4 h-4" />;
            case 'calculate_fee':
                return <Calculator className="w-4 h-4" />;
            case 'view_checklist':
                return <FileText className="w-4 h-4" />;
            case 'view_service':
                return <ExternalLink className="w-4 h-4" />;
            default:
                return null;
        }
    };

    if (actions.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-2 ml-11">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => handleAction(action)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-green-600 text-green-700 rounded-full text-sm hover:bg-green-50 transition-colors"
                >
                    {getIcon(action.type)}
                    {action.label}
                </button>
            ))}
        </div>
    );
}
