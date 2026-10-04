import React from 'react';
import { TabType } from '../types';
import { GitBranch, Shield, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Brand & Mission */}
        <div className="space-y-3 max-w-sm">
          <div className="text-sm font-bold text-white tracking-tight">
            KUCS 94 경조사 진행 포털
          </div>
          <p className="text-neutral-400 leading-relaxed">
            고려대학교 컴퓨터학과 94학번 동기회 상부상조 네트워크. 슬픔은 덜어내고 기쁨은 배가시키는 든든한 동문의 동행입니다.
          </p>
          <div className="flex items-center gap-2 text-neutral-500 pt-1">
            <span>GitHub:</span>
            <button
              onClick={() => onSelectTab('github')}
              className="font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <GitBranch className="w-3 h-3" />
              <span>kucs94</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-neutral-200 font-semibold mb-2">절차 가이드</div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('funeral')} className="hover:text-white transition-colors cursor-pointer">
                  장례(조사) 3일장
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('wedding')} className="hover:text-white transition-colors cursor-pointer">
                  결혼(경사) 10단계
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('other')} className="hover:text-white transition-colors cursor-pointer">
                  수연·첫돌·개업
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-neutral-200 font-semibold mb-2">서식 & 도구</div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('envelope')} className="hover:text-white transition-colors cursor-pointer">
                  봉투 시뮬레이터
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calculator')} className="hover:text-white transition-colors cursor-pointer">
                  축·조의금 계산기
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('messages')} className="hover:text-white transition-colors cursor-pointer">
                  알림·답례문 생성
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-neutral-200 font-semibold mb-2">동문회 연동</div>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('kucs-rules')} className="hover:text-white transition-colors cursor-pointer">
                  경조 지원 규정
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('kucs-rules')} className="hover:text-white transition-colors cursor-pointer">
                  근조기 퀵 배송
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('github')} className="hover:text-white transition-colors cursor-pointer">
                  kucs94 리포지토리
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-neutral-500 gap-4">
        <div>
          © 2026 Korea University Computer Science 1994 Alumni Association (KUCS 94). All rights reserved.
        </div>
        <div className="text-[11px] text-neutral-500">
          품격 있는 관혼상제(冠婚喪祭) 매뉴얼 및 동문 복지 규정
        </div>
      </div>
    </footer>
  );
};
