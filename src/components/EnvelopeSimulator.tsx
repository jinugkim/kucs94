import React, { useState } from 'react';
import { ENVELOPE_PATTERNS } from '../data/protocolData';
import { EnvelopePattern } from '../types';
import { RotateCw, Printer, Check, Info, Sparkles } from 'lucide-react';

export const EnvelopeSimulator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'condolence' | 'congratulation'>('condolence');
  const [selectedPattern, setSelectedPattern] = useState<EnvelopePattern>(ENVELOPE_PATTERNS[0]);
  const [name, setName] = useState('김진욱');
  const [affiliation, setAffiliation] = useState('고려대학교 컴퓨터학과 94학번');
  const [isFlipped, setIsFlipped] = useState(false);
  const [verticalText, setVerticalText] = useState(true);

  const filteredPatterns = ENVELOPE_PATTERNS.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (cat: 'condolence' | 'congratulation') => {
    setSelectedCategory(cat);
    const first = ENVELOPE_PATTERNS.find(p => p.category === cat);
    if (first) setSelectedPattern(first);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>봉투 작성 서식기</span>
            <span aria-hidden="true">·</span>
            <span>한자 표기 & 이름 기재 가이드</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
            경조사 봉투 시뮬레이터 및 서식 안내
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            부의(賻儀)·근조(謹弔)부터 축화혼(祝華婚)까지 격식 있는 앞면 한자 표기와 뒷면 이름·소속 기재법을 실시간으로 확인하고 인쇄하세요.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs no-print"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>봉투 서식 인쇄</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              경조사 종류 선택
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleCategoryChange('condolence')}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'condolence'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                조의금 봉투 (조사 · 장례)
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange('congratulation')}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'congratulation'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                축의금 봉투 (결혼 · 수연 · 발전)
              </button>
            </div>
          </div>

          {/* Pattern Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              앞면 서식 문구 선택
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => setSelectedPattern(pattern)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    selectedPattern.id === pattern.id
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-base font-bold font-serif-kr">{pattern.hanja}</div>
                  <div className="text-xs opacity-75 mt-0.5">{pattern.hangul}</div>
                </button>
              ))}
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 mt-2 text-xs text-neutral-600">
              <span className="font-semibold text-neutral-900 mr-1.5">{selectedPattern.hangul} 뜻:</span>
              <span>{selectedPattern.meaning}</span>
            </div>
          </div>

          {/* Sender Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                성명 (뒷면 좌측 하단)
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                소속 / 학번 / 관계
              </label>
              <input
                type="text"
                value={affiliation}
                onChange={e => setAffiliation(e.target.value)}
                placeholder="고려대학교 컴퓨터학과 94학번"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-500 mr-1 font-medium">소속 빠른 입력:</span>
            {['고려대 컴퓨터학과 94학번', '고려대학교 교우회', 'KUCS 94 동기 일동'].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAffiliation(preset)}
                className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Etiquette Tips Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Info className="w-4 h-4 text-amber-800 shrink-0" />
              <span>경조사 봉투 작성 핵심 에티켓</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-amber-900/90">
              <li>
                <strong>장례(조의금) 봉투:</strong> 봉투 입구를 접거나 풀칠하여 봉하지 않는 것이 예법입니다. (고인의 영혼이 자유롭게 오가라는 의미)
              </li>
              <li>
                <strong>결혼(축의금) 봉투:</strong> 빳빳하고 깨끗한 신권(새 지폐)을 넣는 것이 성의를 표하는 예의입니다.
              </li>
              <li>
                <strong>이름 기재 위치:</strong> 봉투 뒷면을 보았을 때 <strong>좌측 하단</strong>에 이름을 세로 또는 가로로 정자체로 기재하며, 소속은 이름의 오른쪽 위에 작게 병기합니다.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Envelope Preview Simulation (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {isFlipped ? '봉투 뒷면 (이름·소속)' : '봉투 앞면 (한자 서식)'}
            </span>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? '앞면 보기' : '뒷면 보기'}</span>
            </button>
          </div>

          {/* Envelope Card Container */}
          <div className="w-full max-w-[320px] aspect-[9/16] bg-neutral-50 p-4 rounded-2xl border border-neutral-300 shadow-lg flex flex-col justify-between relative overflow-hidden select-none">
            {/* Subtle Korean paper texture lines */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.03) 20px)'
              }}
            />

            {!isFlipped ? (
              /* FRONT OF ENVELOPE */
              <div className="h-full flex flex-col items-center justify-center relative z-10">
                <div className="text-center space-y-4">
                  <div className="text-4xl sm:text-5xl font-bold font-serif-kr tracking-widest text-neutral-900 leading-relaxed [writing-mode:vertical-rl] py-4">
                    {selectedPattern.hanja}
                  </div>
                  <div className="text-xs text-neutral-400 font-serif-kr tracking-widest mt-2">
                    ({selectedPattern.hangul})
                  </div>
                </div>
              </div>
            ) : (
              /* BACK OF ENVELOPE */
              <div className="h-full flex flex-col justify-between relative z-10 p-2">
                {/* Envelope Flap visual */}
                <div className="border-b border-dashed border-neutral-300 pb-3 text-center">
                  <div className="w-16 h-3 bg-neutral-200/60 rounded-b-md mx-auto" />
                  <span className="text-[10px] text-neutral-400">
                    {selectedCategory === 'condolence' ? '(조의금: 풀칠하지 않음)' : '(축의금: 가볍게 접음)'}
                  </span>
                </div>

                {/* Left Bottom Inscription */}
                <div className="mt-auto pl-2 pb-3">
                  {affiliation && (
                    <div className="text-xs text-neutral-600 font-serif-kr mb-1 tracking-tight">
                      {affiliation}
                    </div>
                  )}
                  <div className="text-xl sm:text-2xl font-bold font-serif-kr text-neutral-900 tracking-wider">
                    {name || '성명'}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom watermark badge */}
            <div className="text-center text-[10px] text-neutral-300 pb-1">
              고려대학교 컴퓨터학과 94학번 경조 포털
            </div>
          </div>

          <p className="text-xs text-neutral-500 mt-3 text-center">
            * '뒤집기' 버튼을 눌러 앞면 서식과 뒷면 이름 위치를 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
};
