import React, { useState } from 'react';
import { FUNERAL_TIMELINE, FUNERAL_ETIQUETTES } from '../data/protocolData';
import { CheckCircle2, AlertTriangle, FileText, ChevronRight, Printer, Sparkles, HelpCircle } from 'lucide-react';

export const FuneralGuide: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showBowGuide, setShowBowGuide] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentStep = FUNERAL_TIMELINE[activeDayIndex];

  return (
    <div className="space-y-12">
      {/* Header and Print action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>조사(喪事) 가이드</span>
            <span aria-hidden="true">·</span>
            <span>장례 절차 및 상주/조문객 행동 매뉴얼</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
            장례(조사) 진행 절차 및 조문 예절
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            임종 직후부터 3일장, 발인 및 장지 안장까지 유족이 챙겨야 할 절차와 동문 조문객의 품격 있는 예절입니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs no-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>가이드 인쇄하기</span>
          </button>
        </div>
      </div>

      {/* 3-Day Interactive Timeline Navigation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <span>3일장 표준 진행 일정표</span>
          </h3>
          <span className="text-xs text-neutral-500">일차를 클릭하여 상세 일정을 확인하세요</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FUNERAL_TIMELINE.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                activeDayIndex === idx
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                {step.period}
              </div>
              <div className="text-sm font-bold truncate">
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Detailed Card */}
        <div className="mt-4 p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-neutral-100">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-100 text-neutral-800 mb-2">
                {currentStep.period}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr">
                {currentStep.title}
              </h4>
              <p className="text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {currentStep.documents && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 min-w-[260px]">
                <div className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 mb-2">
                  <FileText className="w-3.5 h-3.5 text-neutral-700" />
                  <span>필수 준비 서류</span>
                </div>
                <ul className="text-xs text-neutral-600 space-y-1">
                  {currentStep.documents.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-neutral-400" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Items List */}
          <div className="mt-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              단계별 주요 점검 및 진행 업무
            </h5>
            <div className="space-y-2.5">
              {currentStep.actions.map((act, aIdx) => {
                const checkKey = `f-${activeDayIndex}-${aIdx}`;
                const isChecked = !!checkedItems[checkKey];
                return (
                  <label
                    key={aIdx}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-neutral-50/80 border-neutral-200 text-neutral-400 line-through'
                        : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCheck(checkKey)}
                      className="mt-0.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                    />
                    <span className="text-sm leading-normal">{act}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Key Notes */}
          {currentStep.keyNotes && currentStep.keyNotes.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900">
              <div className="flex items-center gap-2 text-xs font-bold mb-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>상주 및 유족 핵심 주의사항</span>
              </div>
              <ul className="text-xs space-y-1 text-amber-800 pl-6 list-disc">
                {currentStep.keyNotes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Condolence Etiquette Section for Visitors */}
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>동문 & 조문객 필독</span>
            <span aria-hidden="true">·</span>
            <span>품격 있는 문상 예절</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr">
            조문객 예절 및 행동 수칙
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            고인과 유족에게 실례가 되지 않도록 복장부터 분향/헌화 요령, 조문 인사말까지 숙지해 두세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FUNERAL_ETIQUETTES.map((rule, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-neutral-500 font-semibold mb-1">
                  {rule.category}
                </div>
                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {rule.title}
                </h4>
                <p className="text-xs text-neutral-600 mb-4 pb-4 border-b border-neutral-100 leading-relaxed">
                  {rule.summary}
                </p>

                {/* DOs */}
                <div className="mb-4">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>바람직한 예법 (DO)</span>
                  </div>
                  <ul className="text-xs text-neutral-700 space-y-2">
                    {rule.dos.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONTs */}
                <div>
                  <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>삼가야 할 행동 (DON'T)</span>
                  </div>
                  <ul className="text-xs text-neutral-700 space-y-2">
                    {rule.donts.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Box: Bowing Hand Position & Religion Differences */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="text-xs text-amber-400 font-semibold mb-1">
              놓치기 쉬운 문상 상식
            </div>
            <h4 className="text-xl font-bold font-serif-kr">
              공수법(손 위치) 및 종교별 조문 예식 차이
            </h4>
          </div>
          <button
            onClick={() => setShowBowGuide(!showBowGuide)}
            className="px-4 py-2 text-xs font-medium bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 border border-neutral-700 cursor-pointer self-start md:self-auto"
          >
            {showBowGuide ? '상세 설명 접기' : '상세 공수법 확인하기'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-neutral-800/80 p-5 rounded-xl border border-neutral-700">
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>조사(흉사)에서의 손 포개는 법 (공수법)</span>
            </h5>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              평상시(길사)와 반대로 손을 포개야 합니다. 흉사(장례) 시에는:
            </p>
            <div className="bg-neutral-900/90 p-3 rounded-lg text-xs space-y-2 border border-neutral-700">
              <div className="flex justify-between items-center text-neutral-200">
                <span className="font-semibold text-amber-300">남성</span>
                <span><strong>오른손</strong>을 왼손 위에 얹습니다 (우상좌하)</span>
              </div>
              <div className="flex justify-between items-center text-neutral-200 border-t border-neutral-800 pt-2">
                <span className="font-semibold text-amber-300">여성</span>
                <span><strong>왼손</strong>을 오른손 위에 얹습니다 (좌상우하)</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              * 평상시 세배나 경사 시에는 남자는 왼손이 위, 여자는 오른손이 위입니다.
            </p>
          </div>

          <div className="bg-neutral-800/80 p-5 rounded-xl border border-neutral-700">
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>종교별 조문 방식 차이</span>
            </h5>
            <ul className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <li>
                <strong className="text-white">기독교(개신교) 빈소:</strong> 영정 앞에서 절을 하지 않고, 국화꽃으로 헌화 후 잠시 고개 숙여 기도나 묵념을 드립니다. 상주와도 맞절 대신 정중히 목례합니다.
              </li>
              <li>
                <strong className="text-white">천주교 빈소:</strong> 헌화 후 기도하거나 유교식 분향 및 절을 병행해도 무방합니다.
              </li>
              <li>
                <strong className="text-white">불교 및 유교 빈소:</strong> 분향(향 1~2개) 후 영정에 두 번 큰절(재배)과 가벼운 목례를 올린 뒤, 상주와 맞절 1회를 나눕니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
