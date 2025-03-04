'use client';
import { useState, useRef, useEffect } from 'react';

import Console from './Console';
import Sidebar from './SideNavigation';
import TextEditor from '@/components/create/editor/CodeEditor/TextEditor';
import Button from '@/components/ui/Button';
import Metadata from '@/components/create/editor/CodeEditor/Metadata';
import Contract from '@/components/create/editor/CodeEditor/Contract';

import { useCreateStore } from '@/store/createStore';
import SolanaEditor from '@/components/create/editor/CodeEditor/SolanaEditor';
import YamlEditor from '@/components/create/editor/CodeEditor/YamlEditor';

const Editor = () => {
  const { yamlData, setYamlData, code, setCode, evalCode, setEvalCode, setError, contractFile, setContractFile } = useCreateStore();

  const [content, setContent] = useState(code);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'metadata' | 'contract'>('code');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const fetchYamlData = async () => {
    try {
      setYamlData('// Fetching yaml data... please wait');
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/editor/yaml`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p5: code }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setYamlData('// Error in fetching contract data \n' + error);
        return;
      }

      const data = await response.json();
      setYamlData(data.code + '');
    } catch (err) {
      // @ts-ignore
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fetchContractsData = async () => {
    try {
      setContractFile('// Fetching contract data... please wait');
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/editor/precompile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p5: code }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setContractFile('// Error in fetching contract data \n' + error);
        return;
      }

      const data = await response.json();
      setContractFile(data.code + '');
    } catch (err) {
      // @ts-ignore
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  function switchTab(to) {
    setActiveTab(to as 'code' | 'metadata' | 'contract');

    if (to === 'contract') {
      fetchContractsData();
    }
    if (to === 'metadata') {
      fetchYamlData();
    }
  }

  const handleExampleButtonClick = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/editor/example`);
      if (!response.ok) {
        setError('Failed to fetch example code');
        return;
      }
      const { code } = await response.json();
      setContent(code);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load example');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const handleRunClick = async () => {
    setError(null);
    setCode(content);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/editor/p5compile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: content }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to compile code: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData.precompiled) {
        throw new Error('API response missing required precompiled data');
      }

      const fromBase64 = atob(responseData.precompiled);
      setEvalCode(fromBase64);

      try {
        eval(`${fromBase64}`);
      } catch (evalError) {
        throw evalError;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      setError(event.message);
      return true;
    };

    window.addEventListener('error', handleGlobalError);

    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      setError(args.join(' '));
      originalConsoleError(...args);
    };

    return () => {
      window.removeEventListener('error', handleGlobalError);
      console.error = originalConsoleError;
    };
  }, [setError]);

  return (
    <div className="flex h-full w-full max-w-[50vw] min-w-[720px]">
      <Sidebar activeTab={activeTab} setActiveTab={switchTab} />

      <div className="relative flex h-full w-full flex-col overflow-hidden bg-neutral-700">
        <div className="flex h-16 w-full flex-none items-center gap-4 border-b border-neutral-600 bg-neutral-800 px-6">
          <div className="flex items-center gap-1 font-medium text-neutral-300">
            <i className="ri-file-code-line" />
            <p>{activeTab === 'code' ? 'Code Editor' : activeTab === 'metadata' ? 'Metadata Editor' : 'Contract Editor'}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <input type="file" accept=".js" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <Button size={'sm'} variant={'secondary'} onClick={handleImportClick}>
              Import
              <i className="ri-import-fill font-normal" />
            </Button>
            <Button size={'sm'} variant={'secondary'} onClick={handleExampleButtonClick}>
              Example
              <i className="ri-code-box-line font-normal" />
            </Button>
            <Button size={'sm'} variant={'primary'} onClick={handleRunClick}>
              Run
              <i className="ri-play-fill font-normal" />
            </Button>
          </div>
        </div>
        <div className="h-full w-full max-w-[100%]">
          {
            {
              code: <TextEditor content={content} setContent={setContent} />,
              metadata: <YamlEditor content={yamlData} setContent={setYamlData} />,
              contract: <SolanaEditor content={contractFile} setContent={setContractFile} />,
            }[activeTab]
          }
        </div>
        <Console />
      </div>
    </div>
  );
};

export default Editor;
