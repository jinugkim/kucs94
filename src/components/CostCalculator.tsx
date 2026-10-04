import React, { useState } from 'react';
import { Calculator, Coins, Check, HelpCircle, AlertCircle } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const [eventType, setEventType] = useState<'funeral' | 'wedding' | 'other'>('funeral');
  const [relationship, setRelationship] = useState<'close_alumni' | 'regular_alumni' | 'distant' | 'colleague'>('close_alumni');
  const [attendance, setAttendance] = useState<'attend_eat' | 'attend_no_eat' | 'absent'>('attend_eat');
  const [venueTier, setVenueTier] = useState<'standard' | 'luxury'>('standard');

  // Calculate recommendation
  const calculateAmount = () => {
    let base = 50000;

    if (eventType === 'wedding') {
      if (relationship === 'close_alumni') {
        base = attendance === 'attend_eat' ? 150000 : 100000;
        if (venueTier === 'luxury' && attendance === 'attend_eat') base = 200000;
      } else if (relationship === 'regular_alumni') {
        base = attendance === 'attend_eat' ? 100000 : 50000;
        if (venueTier === 'luxury' && attendance === 'attend_eat') base = 150000;
      } else if (relationship === 'colleague') {
        base = attendance === 'attend_eat' ? 100000 : 50000;
      } else {
        base = attendance === 'attend_eat' ? 100000 : 50000;
      }
    } else if (eventType === 'funeral') {
      // Funeral calculations
      if (relationship === 'close_alumni') {
        base = 200000;
      } else if (relationship === 'regular_alumni') {
        base = 100000;
      } else if (relationship === 'colleague') {
        base = attendance === 'attend_eat' ? 100000 : 50000;
      } else {
        base = 50000;
      }
    } else {
      // Other events (Dol, Suyeon)
      if (relationship === 'close_alumni') {
        base = 100000;
      } else {
        base = 50000;
      }
    }

    return base;
  };

  const amount = calculateAmount();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
          <span>경조사 비용 가이드</span>
          <span aria-hidden="true">·</span>
          <span>물가 및 친분도 반영</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
          축의금 · 조의금 스마트 계산기
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          동기와의 친분, 참석 및 식사 여부, 예식장/장례식장 수준을 고려하여 서로 부담스럽지 않은 적정 기준을 추천합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Event type */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              1. 경조사 유형
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'funeral', label: '장례 (조의금)' },
                { id: 'wedding', label: '결혼 (축의금)' },
                { id: 'other', label: '수연/돌 (축하금)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setEventType(item.id as any)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                    eventType === item.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              2. 상대방과의 친분 관계
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'close_alumni', title: '친한 동기 / 절친한 사이', desc: '평소 자주 연락하고 모임 갖는 사이' },
                { id: 'regular_alumni', title: '일반 동기 / 모임 동문', desc: '학번 모임이나 단톡방에서 교류하는 사이' },
                { id: 'colleague', title: '직장 동료 / 선후배', desc: '업무상 협력하거나 알게 된 선후배' },
                { id: 'distant', title: '오랜만에 연락 온 지인', desc: '몇 년 만에 소식을 전해온 지인' }
              ].map(rel => (
                <button
                  key={rel.id}
                  onClick={() => setRelationship(rel.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    relationship === rel.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">{rel.title}</div>
                  <div className="text-[11px] opacity-75 mt-0.5">{rel.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              3. 본인 참석 및 식사 여부
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'attend_eat', title: '참석 + 식사함', desc: '식대 감안 필요' },
                { id: 'attend_no_eat', title: '참석만 + 식사 안 함', desc: '인사만 나누고 이동' },
                { id: 'absent', title: '불참 + 송금만', desc: '마음만 전함' }
              ].map(att => (
                <button
                  key={att.id}
                  onClick={() => setAttendance(att.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    attendance === att.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">{att.title}</div>
                  <div className="text-[11px] opacity-75 mt-0.5">{att.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Venue Tier (for wedding) */}
          {eventType === 'wedding' && (
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                4. 예식장 장소 수준
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setVenueTier('standard')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    venueTier === 'standard'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">일반 웨딩홀 / 컨벤션</div>
                  <div className="text-[11px] opacity-75 mt-0.5">식대 평균 5~7만원 선</div>
                </button>
                <button
                  onClick={() => setVenueTier('luxury')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    venueTier === 'luxury'
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-bold">특급호텔 / 프리미엄 홀</div>
                  <div className="text-[11px] opacity-75 mt-0.5">식대 10~15만원 이상</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Output Recommendation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 bg-neutral-900 text-white rounded-2xl shadow-lg border border-neutral-800">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              추천 적정 부조금
            </div>

            <div className="text-4xl sm:text-5xl font-bold font-serif-kr text-white mb-2 tabular-nums">
              {amount.toLocaleString('ko-KR')}
              <span className="text-2xl font-normal ml-1">원</span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed pt-3 border-t border-neutral-800">
              {eventType === 'funeral' ? (
                amount >= 200000 
                  ? '각별한 동기 모임으로서 큰 슬픔에 처한 상주에게 큰 힘이 되어주는 품격 있는 위로선입니다.'
                  : '슬픔을 위로하며 고인의 명복을 비는 단정하고 정중한 금액입니다.'
              ) : (
                attendance === 'attend_eat' && amount >= 150000
                  ? '호텔/프리미엄 식대 및 신랑 신부의 예식 비용을 충분히 배려한 축하선입니다.'
                  : attendance === 'attend_eat'
                  ? '최근 예식장 1인 식대(6~8만 원)를 감안한 가장 보편적이고 예의 있는 축의선입니다.'
                  : '참석하지 못하거나 식사를 하지 않는 대신 마음을 전하기에 알맞은 금액입니다.'
              )}
            </p>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>KUCS 94 동문회 추천 기준</span>
              <span className="font-semibold text-white">현실 물가 반영</span>
            </div>
          </div>

          {/* Cultural etiquette notes */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-700 space-y-2">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5 mb-2">
              <Coins className="w-4 h-4 text-neutral-700" />
              <span>경조사 금액 결정 시 3대 상식</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
              <li>
                <strong>홀수 단위의 원칙:</strong> 음양오행상 길한 기운을 뜻하는 홀수(3만, 5만, 7만 원)로 맞춥니다. 10만 원은 3과 7이 합쳐진 완전수로 보아 허용됩니다.
              </li>
              <li>
                <strong>4만 원과 9만 원 기피:</strong> 죽을 사(死)와 발음이 유사한 4나 아홉수는 전통적으로 피합니다.
              </li>
              <li>
                <strong>식대 배려:</strong> 최근 수도권 웨딩홀 식대가 6~8만원 이상이므로, 직접 참석하여 식사할 경우 최소 10만 원이 기본 매너로 자리잡았습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
