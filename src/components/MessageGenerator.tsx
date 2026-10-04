import React, { useState } from 'react';
import { MESSAGE_TEMPLATES, MessageTemplate } from '../data/templatesData';
import { Copy, Check, Share2, Sparkles, MessageSquare } from 'lucide-react';

export const MessageGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate>(MESSAGE_TEMPLATES[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MESSAGE_TEMPLATES[0].fields.forEach(f => {
      init[f.key] = f.defaultValue || '';
    });
    return init;
  });
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (tmpl: MessageTemplate) => {
    setSelectedTemplate(tmpl);
    const newValues: Record<string, string> = {};
    tmpl.fields.forEach(f => {
      newValues[f.key] = f.defaultValue || '';
    });
    setFieldValues(newValues);
    setCopied(false);
  };

  const handleFieldChange = (key: string, val: string) => {
    setFieldValues(prev => ({ ...prev, [key]: val }));
    setCopied(false);
  };

  // Compile final message string
  const compileMessage = () => {
    let text = selectedTemplate.template;
    selectedTemplate.fields.forEach(f => {
      const val = fieldValues[f.key] || `[${f.label}]`;
      text = text.replaceAll(`{${f.key}}`, val);
    });
    return text;
  };

  const compiledText = compileMessage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compiledText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
          <span>모바일 서식 생성기</span>
          <span aria-hidden="true">·</span>
          <span>원클릭 카톡/문자 복사</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr">
          경조사 알림 및 감사 답례문 생성기
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          부고 알림부터 모바일 청첩 안내, 장례 및 결혼 후 정중한 감사 답례문까지 실시간으로 완성하여 바로 복사하세요.
        </p>
      </div>

      {/* Template Selector Pills */}
      <div>
        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
          서식 템플릿 선택
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MESSAGE_TEMPLATES.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => handleTemplateSelect(tmpl)}
              className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                selectedTemplate.id === tmpl.id
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="text-[11px] font-semibold opacity-70 mb-0.5">{tmpl.category}</div>
              <div className="text-xs font-bold truncate">{tmpl.name.split('(')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input fields (6 cols) */}
        <div className="lg:col-span-6 space-y-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              {selectedTemplate.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
              {selectedTemplate.description}
            </p>
          </div>

          <div className="space-y-3.5">
            {selectedTemplate.fields.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={fieldValues[field.key] || ''}
                  onChange={e => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compiled Text Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  완성된 메시지 미리보기
                </span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {compiledText.length} 자
              </span>
            </div>

            {/* Message Body */}
            <div className="bg-neutral-800/80 p-4 rounded-xl border border-neutral-700/80 font-sans text-xs sm:text-sm text-neutral-100 whitespace-pre-wrap leading-relaxed select-text min-h-[260px]">
              {compiledText}
            </div>

            {/* Action buttons */}
            <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">
                카카오톡 또는 문자에 바로 붙여넣기 하실 수 있습니다.
              </span>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>클립보드 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800 mr-1.5">💡 전송 팁:</span>
            <span>단체 카톡방 공유 시 사진이나 약도 링크를 첨부하고 본문을 함께 전달하시면 더욱 원활합니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
