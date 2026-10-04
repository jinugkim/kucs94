import React, { useState } from 'react';
import { TabType } from '../types';
import { Bell, GitBranch, QrCode, X, Copy, Check, Smartphone } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRegisterModal,
}) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const sharedUrl = 'https://ais-pre-wcjzjudu3o27nmxf75g5yu-683159593029.asia-northeast1.run.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(sharedUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sharedUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('funeral')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
            KUCS 94 경조사 포털
          </span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <button
            onClick={() => setActiveTab('funeral')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'funeral' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            장례(조사) 절차
          </button>
          <button
            onClick={() => setActiveTab('wedding')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'wedding' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            결혼(경사) 절차
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'other' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            기타 경조사
          </button>
          <button
            onClick={() => setActiveTab('envelope')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'envelope' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            봉투 서식기
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            축·조의금 계산기
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'messages' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            알림·답례문 생성
          </button>
          <button
            onClick={() => setActiveTab('kucs-rules')}
            className={`transition-colors hover:text-neutral-900 whitespace-nowrap cursor-pointer ${
              activeTab === 'kucs-rules' ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-neutral-900' : ''
            }`}
          >
            동문 지원 기준
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border text-neutral-700 border-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="스마트폰 카메라로 스캔하여 모바일에서 열기"
          >
            <Smartphone className="w-3.5 h-3.5 text-neutral-800" />
            <span className="hidden sm:inline">모바일 접속 QR</span>
          </button>

          <a
            href="https://github.com/jinugkim/kucs94"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border text-neutral-700 border-neutral-300 hover:bg-neutral-100 items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="GitHub jinugkim/kucs94 리포지토리 바로가기"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>jinugkim/kucs94</span>
          </a>

          <button
            onClick={onOpenRegisterModal}
            className="px-3 py-1.5 sm:px-3.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>경조사 등록</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal for Mobile Access */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-neutral-200 text-center">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex p-2.5 rounded-full bg-neutral-100 text-neutral-900 mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-neutral-900 font-serif-kr mb-1">
              스마트폰으로 바로 접속하기
            </h3>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
              기본 <strong>카메라 앱</strong>으로 아래 QR 코드를 비추면<br />
              모바일 전용 최적화 화면이 바로 열립니다.
            </p>

            {/* QR Code Image */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 inline-block mb-4 shadow-2xs">
              <img
                src={qrCodeUrl}
                alt="Mobile Access QR Code"
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedUrl ? '모바일 주소 복사 완료!' : '모바일 웹 주소 복사하기'}</span>
              </button>
              <p className="text-[11px] text-neutral-400">
                카카오톡 [나와의 채팅]에 붙여넣기 하셔도 바로 열립니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Secondary Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-neutral-100 gap-2 scrollbar-none text-xs bg-neutral-50/80">
        {[
          { id: 'funeral', label: '장례 절차' },
          { id: 'wedding', label: '결혼 절차' },
          { id: 'other', label: '기타 경조사' },
          { id: 'envelope', label: '봉투 서식' },
          { id: 'calculator', label: '금액 계산' },
          { id: 'messages', label: '알림문 생성' },
          { id: 'kucs-rules', label: '동문 지원' },
          { id: 'github', label: 'GitHub' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
