import React from 'react';
import { TabType } from '../types';
import { HeartHandshake, ShieldAlert, Sparkles, FileText, ArrowRight, Search } from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: TabType) => void;
  onOpenRegisterModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab, onOpenRegisterModal }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 tracking-wider uppercase font-medium">
            <span>고려대학교 컴퓨터학과 94학번 동기회</span>
            <span aria-hidden="true">·</span>
            <span>경조사 진행 매뉴얼 & 상부상조 포털</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-semibold">kucs94</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight font-serif-kr" style={{ textWrap: 'balance' }}>
            슬픔은 함께 나누고,<br />기쁨은 함께 더합니다
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl font-normal">
            경황없는 조사(장례)와 복잡한 경사(결혼·수연)의 단계별 진행 절차부터 조문·하객 예절, 봉투 작성, 알림장 생성, 동문회 근조기 및 화환 지원 규정까지 한눈에 확인하세요.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('funeral')}
              className="px-5 py-2.5 bg-white text-neutral-900 font-semibold text-sm rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>장례 절차 & 조문 예절</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('wedding')}
              className="px-5 py-2.5 bg-neutral-800 text-white font-semibold text-sm rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>결혼 절차 & 식순</span>
            </button>
            <button
              onClick={onOpenRegisterModal}
              className="px-5 py-2.5 bg-amber-600/90 text-white font-semibold text-sm rounded-lg hover:bg-amber-500 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>동문 경조사 등록 / 근조기 신청</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-800">
          <div 
            onClick={() => onSelectTab('funeral')}
            className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:bg-neutral-800 transition-all cursor-pointer group"
          >
            <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
              <span>조사 (장례)</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5">3일장 타임라인 & 조문</h3>
            <p className="text-xs text-neutral-300 leading-normal">
              임종·빈소·입관·발인 단계별 행동 요령과 상주 준비물, 분향/헌화 예법
            </p>
          </div>

          <div 
            onClick={() => onSelectTab('wedding')}
            className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:bg-neutral-800 transition-all cursor-pointer group"
          >
            <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
              <span>경사 (결혼)</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5">결혼 준비 & 10단계 식순</h3>
            <p className="text-xs text-neutral-300 leading-normal">
              D-180 타임라인, 표준 예식 순서 및 사회자/접수대 운영 가이드
            </p>
          </div>

          <div 
            onClick={() => onSelectTab('envelope')}
            className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:bg-neutral-800 transition-all cursor-pointer group"
          >
            <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
              <span>서식 도구</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5">인터랙티브 봉투 시뮬레이터</h3>
            <p className="text-xs text-neutral-300 leading-normal">
              부의(賻儀)·축화혼(祝華婚) 한자 서식 및 소속·이름 배치 미리보기
            </p>
          </div>

          <div 
            onClick={() => onSelectTab('kucs-rules')}
            className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 hover:bg-neutral-800 transition-all cursor-pointer group"
          >
            <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
              <span>KUCS 94 특별 회칙</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1.5">동문회 경조 지원 기준</h3>
            <p className="text-xs text-neutral-300 leading-normal">
              경조금 20~30만 원, 근조기 긴급 퀵 배송 및 화환 접수 프로세스
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
