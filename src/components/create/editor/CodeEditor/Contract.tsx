'use client';

import { useEffect, useState } from 'react';
import { useCreateStore } from '@/store/createStore';

export default function ContractsPage() {
  const [contractCode, setContractCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { code } = useCreateStore();

  useEffect(() => {
    const fetchContractsData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/editor/precompile`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ p5: code }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setContractCode(data.code+'');
      } catch (err) {
        // @ts-ignore
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchContractsData();
  }, []);

  if (loading)
    return (
      <div className={'flex flex-col gap-2 p-8'}>
        <h1>loading...</h1>
      </div>
    );
  if (error) return <div className={'flex flex-col gap-2 p-8'}>No Contract Found</div>;

  return (
    <div className={'flex flex-col gap-2 p-8'}>
      <h1>Contract:</h1>
      <pre>{contractCode}</pre>
    </div>
  );
}
