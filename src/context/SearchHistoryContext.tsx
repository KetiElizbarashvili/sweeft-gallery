import { createContext, useContext, useState, ReactNode } from 'react';

interface QueryContextProps {
    queries: string[];
    setQueries: React.Dispatch<React.SetStateAction<string[]>>;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);

export const useQueries = () => {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error('useQueries must be used within a QueryProvider');
    }
    return context;
};

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [queries, setQueries] = useState<string[]>([]);
    return (
        <QueryContext.Provider value={{ queries, setQueries }}>
            {children}
        </QueryContext.Provider>
    );
};