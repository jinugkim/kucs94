import React, { useState } from 'react';
import { KUCS_SUPPORT_RULES } from '../data/protocolData';
import { EventNotice } from '../types';
import { ShieldCheck, Truck, PhoneCall, Bell, Heart, Send, ExternalLink } from 'lucide-react';

interface KucsRulesSectionProps {
  notices: EventNotice[];
  onOpenRegisterModal: () => void;
  onSendEncouragement: (noticeId: string, message: string) => void;
  encouragements: Record<string, string[]>;
}

export const KucsRulesSection: React.FC<KucsRulesSectionProps> = ({
  notices,
  onOpenRegisterModal,
  onSendEncouragement,
  encouragements,
}) => {
  const [activeNoticeId, setActiveNoticeId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleCommentSubmit = (noticeId: string) => {
    if (!commentInput.trim()) return;
    onSendEncouragement(noticeId, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
            <span>고려대학교 컴퓨터학과 94학번 특별 회칙</span>
            <span aria-hidden="true">·</span>
            <span>동문 상부상조 기금</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
            KUCS 94 동문회 경조 지원 규정 및 근조기 신청
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            동문회비 납부 정회원의 경조사 발생 시 지원되는 경조금, 축하 화환 및 근조기 긴급 배송 규정입니다.
          </p>
        </div>

        <button
          onClick={onOpenRegisterModal}
          className="px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>경조사 등록 및 화환 신청</span>
        </button>
      </div>

      {/* Support Rules Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>경조금 및 물품 지급 기준표</span>
          </h3>
          <span className="text-xs text-neutral-500">2026년 동기회 정기총회 개정안 기준</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-100 text-neutral-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 sm:px-6">경조 구분</th>
                <th className="py-3 px-4 sm:px-6">경조금 지원</th>
                <th className="py-3 px-4 sm:px-6">지원 물품 (화환/근조기)</th>
                <th className="py-3 px-4 sm:px-6">경조 휴가(참고)</th>
                <th className="py-3 px-4 sm:px-6">지급 요건 및 비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              {KUCS_SUPPORT_RULES.map((rule, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-900 whitespace-nowrap">
                    {rule.target}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                    {rule.supportAmount}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-neutral-700">
                    {rule.items}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-neutral-500 whitespace-nowrap">
                    {rule.leaveDays}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-neutral-600 text-xs">
                    {rule.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Condolence Flag & Wreath Emergency Dispatch Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-900 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-2">
              <Truck className="w-4 h-4" />
              <span>고려대 컴퓨터학과 94학번 근조기 긴급 퀵 배송 안내</span>
            </div>
            <h4 className="text-lg font-bold font-serif-kr mb-2">
              조사(喪事) 발생 즉시 근조기 출동
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              동문 및 배우자 부모상 비보가 접수되면, 동기회 총무단 협약 화원사를 통해 전국 장례식장에 <strong>고려대학교 컴퓨터학과 94학번 근조기(동문기)</strong>와 <strong>근조 3단 화환</strong>이 당일 즉시 퀵 배송으로 설치됩니다.
            </p>
            <div className="bg-neutral-800/80 p-3.5 rounded-xl border border-neutral-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-400">배송 권역:</span>
                <span className="font-semibold text-neutral-200">전국 시·군 장례식장</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">발인 후 회수:</span>
                <span className="font-semibold text-neutral-200">화원사 전담 수거 (유족 회수 부담 없음)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>총무단 긴급 핫라인</span>
            <span className="text-amber-400 font-mono font-bold">010-3849-2910</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold mb-2">
              <PhoneCall className="w-4 h-4 text-neutral-700" />
              <span>경조사 접수 및 동기회 전파 절차</span>
            </div>
            <h4 className="text-lg font-bold text-neutral-900 font-serif-kr mb-2">
              비보/경사 접수 시 3단계 프로세스
            </h4>
            <ol className="text-xs text-neutral-700 space-y-3 leading-relaxed mt-4">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <div>
                  <strong>경조사 등록/신청서 작성:</strong> 본 포털의 [경조사 등록·신청] 버튼 또는 총무단 유선 연락으로 빈소/예식장 및 일시를 등록합니다.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <div>
                  <strong>화환 및 근조기 발주:</strong> 총무단에서 접수 확인 후 지정 화원사에 즉시 발주하여 화환/근조기를 빈소로 급송합니다.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <div>
                  <strong>KUCS 94 단톡방 및 게시판 공지:</strong> 전체 동기들에게 표준 양식으로 알림을 배포하고 동문 대표 조문단을 편성합니다.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Alumni Notice Feed */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 font-serif-kr">
              최근 등록된 동문 경조사 알림
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              동기들의 최근 소식을 확인하고 따뜻한 위로와 축하 메시지를 남겨주세요.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notices.map(notice => {
            const list = encouragements[notice.id] || [];
            const isCommentsOpen = activeNoticeId === notice.id;

            return (
              <div
                key={notice.id}
                className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      notice.category === '조사' 
                        ? 'bg-neutral-900 text-white' 
                        : notice.category === '결혼'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {notice.createdAt}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                    {notice.title}
                  </h4>

                  <div className="text-xs text-neutral-600 space-y-1 mb-4 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    <div><strong>일시:</strong> {notice.date}</div>
                    <div><strong>장소:</strong> {notice.location} {notice.room ? `(${notice.room})` : ''}</div>
                    {notice.account && <div><strong>마음 전하실 곳:</strong> {notice.account}</div>}
                    {notice.contact && <div><strong>연락처:</strong> {notice.contact}</div>}
                  </div>

                  {notice.wreathDispatched && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 mb-3">
                      <Truck className="w-3 h-3" />
                      <span>동문회 근조기 / 화환 발송 완료</span>
                    </div>
                  )}
                </div>

                {/* Encouragement Comments */}
                <div className="pt-3 border-t border-neutral-100 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => setActiveNoticeId(isCommentsOpen ? null : notice.id)}
                      className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>위로/축하 글 ({list.length})</span>
                    </button>
                  </div>

                  {isCommentsOpen && (
                    <div className="space-y-2 mt-2">
                      <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs text-neutral-700 pr-1">
                        {list.length === 0 ? (
                          <div className="text-neutral-400 text-center py-2 text-[11px]">
                            가장 먼저 따뜻한 한마디를 남겨보세요.
                          </div>
                        ) : (
                          list.map((msg, mIdx) => (
                            <div key={mIdx} className="bg-neutral-50 p-2 rounded border border-neutral-100">
                              {msg}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={commentInput}
                          onChange={e => setCommentInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleCommentSubmit(notice.id)}
                          placeholder="한마디 남기기..."
                          className="flex-1 px-2.5 py-1.5 text-xs rounded border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        <button
                          onClick={() => handleCommentSubmit(notice.id)}
                          className="px-2.5 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded hover:bg-neutral-800 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
