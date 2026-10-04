import React, { useState } from 'react';
import { WEDDING_TIMELINE, WEDDING_CEREMONY_STEPS, WEDDING_ETIQUETTES } from '../data/protocolData';
import { CheckCircle2, AlertTriangle, Users, Clock, Sparkles } from 'lucide-react';

export const WeddingGuide: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedCeremonyIdx, setSelectedCeremonyIdx] = useState(0);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
          <span>경사(慶事) 가이드</span>
          <span aria-hidden="true">·</span>
          <span>결혼 준비 타임라인 및 표준 식순</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
          결혼(경사) 진행 절차 및 하객 예절
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          D-180 상견례부터 D-Day 본식 10단계 식순, 그리고 동문 하객들의 단정한 참석 예절 매뉴얼입니다.
        </p>
      </div>

      {/* Wedding Preparation Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-neutral-900">
            결혼 준비 단계별 타임라인
          </h3>
          <span className="text-xs text-neutral-500">기간을 선택해 체크리스트를 확인하세요</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {WEDDING_TIMELINE.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                {item.period}
              </div>
              <div className="text-sm font-bold truncate">
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Timeline Detail Card */}
        <div className="mt-4 p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-100 text-neutral-800 mb-2">
            {WEDDING_TIMELINE[activeStepIndex].period}
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr">
            {WEDDING_TIMELINE[activeStepIndex].title}
          </h4>
          <p className="text-sm text-neutral-600 mt-1 mb-6">
            {WEDDING_TIMELINE[activeStepIndex].description}
          </p>

          <div className="space-y-2.5">
            {WEDDING_TIMELINE[activeStepIndex].actions.map((act, aIdx) => (
              <div key={aIdx} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 font-bold text-xs mt-0.5">0{aIdx + 1}</span>
                <span className="text-sm text-neutral-800 leading-normal">{act}</span>
              </div>
            ))}
          </div>

          {WEDDING_TIMELINE[activeStepIndex].keyNotes && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs">
              <span className="font-bold mr-1.5">📌 중요 포인트:</span>
              <span>{WEDDING_TIMELINE[activeStepIndex].keyNotes[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Standard 10-Step Wedding Ceremony Sequence */}
      <div>
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>본식 식순</span>
            <span aria-hidden="true">·</span>
            <span>사회자 및 신랑·신부 참고</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr">
            표준 결혼식 10단계 식순
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            일반적인 예식에서 가장 널리 쓰이는 표준 식순 흐름과 주요 연출 포인트입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
          {WEDDING_CEREMONY_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCeremonyIdx(idx)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                selectedCeremonyIdx === idx
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="text-xs font-mono font-bold opacity-70 mb-0.5">{step.step}</div>
              <div className="text-xs font-bold truncate">{step.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Step Display */}
        <div className="p-6 bg-neutral-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs text-amber-400 font-semibold mb-1">
              STEP {WEDDING_CEREMONY_STEPS[selectedCeremonyIdx].step}
            </div>
            <h4 className="text-xl font-bold font-serif-kr mb-2">
              {WEDDING_CEREMONY_STEPS[selectedCeremonyIdx].title}
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {WEDDING_CEREMONY_STEPS[selectedCeremonyIdx].desc}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSelectedCeremonyIdx(prev => (prev > 0 ? prev - 1 : prev))}
              disabled={selectedCeremonyIdx === 0}
              className="px-3 py-1.5 text-xs rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 disabled:opacity-40 cursor-pointer"
            >
              이전 단계
            </button>
            <button
              onClick={() => setSelectedCeremonyIdx(prev => (prev < WEDDING_CEREMONY_STEPS.length - 1 ? prev + 1 : prev))}
              disabled={selectedCeremonyIdx === WEDDING_CEREMONY_STEPS.length - 1}
              className="px-3 py-1.5 text-xs rounded bg-white text-neutral-900 font-semibold hover:bg-neutral-100 disabled:opacity-40 cursor-pointer"
            >
              다음 단계
            </button>
          </div>
        </div>
      </div>

      {/* Guest Etiquettes */}
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>동문 & 하객 매너</span>
            <span aria-hidden="true">·</span>
            <span>센스 있는 하객이 되는 법</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr">
            하객 참석 및 축의 예절
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEDDING_ETIQUETTES.map((rule, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs text-neutral-500 font-semibold mb-1">
                  {rule.category}
                </div>
                <h4 className="text-base font-bold text-neutral-900 mb-2">
                  {rule.title}
                </h4>
                <p className="text-xs text-neutral-600 mb-4 pb-4 border-b border-neutral-100">
                  {rule.summary}
                </p>

                <div className="mb-4">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>추천 에티켓 (DO)</span>
                  </div>
                  <ul className="text-xs text-neutral-700 space-y-2">
                    {rule.dos.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>주의할 점 (DON'T)</span>
                  </div>
                  <ul className="text-xs text-neutral-700 space-y-2">
                    {rule.donts.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Tip: Alumni Reception Desk Manual */}
      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 mb-2">
          <Users className="w-4 h-4 text-neutral-700" />
          <span>동문 축의금 접수대(부주석) 도우미 실전 매뉴얼</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
          동기 결혼식에서 접수대를 맡게 되었을 때 가장 중요한 4가지 원칙입니다:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-neutral-800">
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">1. 봉투 넘버링</span>
            <span>축의금 봉투를 받는 즉시 우측 상단에 방명록 순번(001, 002...)을 펜으로 정확히 기재합니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">2. 식권 수량 확인</span>
            <span>하객 1인이 여러 봉투를 내거나 가족 동반 시 식권 필요 수량을 정중히 묻고 교부합니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">3. 이름 재확인</span>
            <span>봉투에 이름이 적혀있지 않거나 악필로 식별이 어려울 경우 즉시 이름을 확인하여 메모합니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">4. 가방 안전 보관</span>
            <span>축의금 가방은 항상 몸 앞쪽이나 잠금장치가 있는 보관함에 두고 2인 1조로 자리를 지킵니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
