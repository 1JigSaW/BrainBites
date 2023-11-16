import { Criteria } from "./api/badge.api";

export const calculateTotalCriteria = (criteria: Criteria): number => {
    return Object.values(criteria).reduce<number>((total, value) => {
        if (typeof value === 'number') {
            return total + value;
        } else if (typeof value === 'object' && value !== null && 'count' in value) {
            const obj = value as { count: number; topic_id: number };
            return total + obj.count;
        }
        return total;
    }, 0);
};

export const calculateProgressBarWidth = (current: number, criteria: Criteria): string => {
    const target = calculateTotalCriteria(criteria);
    const percentage = (current / target) * 100;
    return `${Math.min(Math.max(percentage, 0), 100)}%`;
};

