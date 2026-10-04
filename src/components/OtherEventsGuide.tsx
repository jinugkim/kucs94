import React, { useState } from 'react';
import { OTHER_EVENTS } from '../data/protocolData';
import { Award, Baby, Building2, Gift, Sparkles, Check } from 'lucide-react';

export const OtherEventsGuide: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState('suyeon');

  const selectedEvent = OTHER_EVENTS.find(e => e.id === selectedEventId) || OTHER_EVENTS[0];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
          <span>기타 주요 경조사</span>
          <span aria-hidden="true">·</span>
          <span>생신·출산·사회적 성취 가이드</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
          수연(칠순·팔순) · 첫돌 · 개업 및 승진
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          부모님 생신 잔치부터 아기의 첫 번째 생일, 동문의 사업 시작과 직장 내 영전까지 알맞은 예절과 식순을 안내합니다.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OTHER_EVENTS.map(event => (
          <button
            key={event.id}
            onClick={() => setSelectedEventId(event.id)}
            className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
              selectedEventId === event.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-xs font-semibold mb-1 opacity-80">{event.category}</div>
            <div className="text-base font-bold">{event.name}</div>
          </button>
        ))}
      </div>

      {/* Selected Event Details */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-semibold text-neutral-500 mb-1">
            대상 및 시기: {selectedEvent.targetAge}
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 font-serif-kr mb-2">
            {selectedEvent.name}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">
            {selectedEvent.desc}
          </p>
        </div>

        {/* Steps */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            주요 진행 절차 및 준비 사항
          </h4>
          <div className="space-y-2.5">
            {selectedEvent.steps.map((st, sIdx) => (
              <div key={sIdx} className="flex items-start gap-3 p-3.5 rounded-lg bg-neutral-50 border border-neutral-200/80 text-neutral-800 text-sm">
                <span className="font-bold text-neutral-400 text-xs mt-0.5">0{sIdx + 1}</span>
                <span className="leading-relaxed">{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Envelope Inscriptions */}
        <div className="pt-4 border-t border-neutral-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            추천 봉투 한자 문구
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedEvent.envelopeOptions.map((opt, oIdx) => (
              <span
                key={oIdx}
                className="px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Special Doljabi Meaning Box if baby */}
        {selectedEventId === 'baby' && (
          <div className="p-5 rounded-xl bg-neutral-900 text-white mt-6">
            <div className="text-xs text-amber-400 font-semibold mb-2">
              알아두면 유익한 돌잡이 용품의 의미
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">명주실</div>
                <div className="text-neutral-300 text-[11px]">무병장수 & 건강</div>
              </div>
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">붓 · 연필</div>
                <div className="text-neutral-300 text-[11px]">학문 & 뛰어난 두뇌</div>
              </div>
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">마우스·노트북</div>
                <div className="text-neutral-300 text-[11px]">IT·소프트웨어 거장</div>
              </div>
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">돈 · 금반지</div>
                <div className="text-neutral-300 text-[11px]">풍요로운 부와 번영</div>
              </div>
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">청진기</div>
                <div className="text-neutral-300 text-[11px]">의술 & 생명 구호</div>
              </div>
              <div className="p-2.5 bg-neutral-800 rounded-lg border border-neutral-700">
                <div className="font-bold text-amber-300 mb-1">마이크</div>
                <div className="text-neutral-300 text-[11px]">방송 & 예술가</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
