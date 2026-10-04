import React, { useState } from 'react';
import { EventNotice } from '../types';
import { X, Bell, Truck, Check } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (notice: Omit<EventNotice, 'id' | 'createdAt'>) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [category, setCategory] = useState<'조사' | '결혼' | '수연' | '출산' | '기타'>('조사');
  const [memberName, setMemberName] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [room, setRoom] = useState('');
  const [account, setAccount] = useState('');
  const [contact, setContact] = useState('');
  const [wreathDispatched, setWreathDispatched] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !title.trim() || !location.trim()) {
      alert('동문 성명, 제목, 장소는 필수 입력 사항입니다.');
      return;
    }

    onRegister({
      category,
      title: title.trim(),
      memberName: memberName.trim(),
      graduationYear: '고려대 컴퓨터학과 94학번',
      date: date.trim() || '추후 공지',
      location: location.trim(),
      room: room.trim() || undefined,
      account: account.trim() || undefined,
      contact: contact.trim() || undefined,
      wreathDispatched
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
          <Bell className="w-3.5 h-3.5 text-neutral-700" />
          <span>KUCS 94 동문 경조사 등록</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-kr mb-2">
          경조사 공지 등록 및 화환/근조기 신청
        </h3>
        <p className="text-xs text-neutral-600 mb-6">
          등록하신 내용은 동문회 피드에 즉시 반영되며, 총무단으로 자동 접수되어 지원 절차가 시작됩니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              경조 구분 *
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['조사', '결혼', '수연', '출산', '기타'] as const).map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    if (!title) {
                      setTitle(cat === '조사' ? '[부고] 94학번 모친상' : cat === '결혼' ? '[화혼] 94학번 결혼식' : `[공지] 94학번 ${cat}`);
                    }
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Member Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                동문 성명 *
              </label>
              <input
                type="text"
                required
                value={memberName}
                onChange={e => setMemberName(e.target.value)}
                placeholder="예: 김진욱"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                연락처 (핸드폰)
              </label>
              <input
                type="text"
                value={contact}
                onChange={e => setContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              공지 제목 *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="예: [부고] 94학번 김진욱 동기 부친상"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                일시 (발인 / 예식 일시)
              </label>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="예: 2026-10-10 발인 (08:00)"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                장례식장 / 예식장 장소 *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="예: 고려대 안암병원 장례식장"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Room & Account */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                상세 호실
              </label>
              <input
                type="text"
                value={room}
                onChange={e => setRoom(e.target.value)}
                placeholder="예: 특실 302호"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                마음 전하실 계좌번호
              </label>
              <input
                type="text"
                value={account}
                onChange={e => setAccount(e.target.value)}
                placeholder="은행 및 계좌번호 (예금주)"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Flag / Wreath dispatch checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 cursor-pointer">
            <input
              type="checkbox"
              checked={wreathDispatched}
              onChange={e => setWreathDispatched(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-bold text-neutral-900 block flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-700" />
                <span>고려대 컴퓨터학과 94학번 근조기 / 축하 화환 긴급 배송 요청</span>
              </span>
              <span className="text-neutral-500">
                접수 즉시 동문회 지정 화원사를 통해 현장으로 긴급 배송 및 설치됩니다.
              </span>
            </div>
          </label>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
            >
              공지 등록 및 신청 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
