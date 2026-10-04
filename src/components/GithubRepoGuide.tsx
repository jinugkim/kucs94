import React, { useState } from 'react';
import { GitBranch, Terminal, Copy, Check, ExternalLink, Github, FolderTree, Code2 } from 'lucide-react';

export const GithubRepoGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [githubUsername, setGithubUsername] = useState('jinug-kim');

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const cliCommand = `gh repo create kucs94 --public --source=. --remote=origin --push`;
  const gitCommands = `git remote add origin https://github.com/${githubUsername}/kucs94.git\ngit branch -M main\ngit push -u origin main`;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1 font-medium">
          <span>GitHub 저장소 연동 가이드</span>
          <span aria-hidden="true">·</span>
          <span>리포지토리명: kucs94</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight font-serif-kr flex items-center gap-2">
          <span>GitHub kucs94 리포지토리 생성 및 연동</span>
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          현재 앱의 전체 코드베이스가 Git 리포지토리(브랜치 main, README.md 포함)로 세팅되어 있습니다. 아래 명령어로 본인의 GitHub 계정에 <strong>kucs94</strong> 리포지토리를 원클릭으로 생성하고 푸시할 수 있습니다.
        </p>
      </div>

      {/* Status Card */}
      <div className="p-6 bg-neutral-900 text-white rounded-2xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Local Git Repository Initialized
            </span>
          </div>
          <h3 className="text-xl font-bold font-mono text-white">
            Repository Name: kucs94
          </h3>
          <p className="text-xs text-neutral-400">
            기본 브랜치: <code className="text-amber-300 font-mono">main</code> · 설정 파일: <code className="text-neutral-300">README.md, package.json, src/*</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-neutral-400">타겟 저장소 URL 예시</div>
            <div className="text-xs font-mono text-amber-300">github.com/{githubUsername}/kucs94</div>
          </div>
        </div>
      </div>

      {/* GitHub Username Input */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-neutral-700">
          <strong className="text-neutral-900">본인의 GitHub ID를 입력하시면</strong> 아래 명령어가 실시간으로 맞춰집니다:
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-mono">github.com/</span>
          <input
            type="text"
            value={githubUsername}
            onChange={e => setGithubUsername(e.target.value.trim() || 'your-username')}
            placeholder="GitHub 아이디 입력"
            className="px-3 py-1.5 text-xs font-mono rounded border border-neutral-300 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>

      {/* Method 1 & 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Method 1: Git CLI */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-700" />
                <span>방법 A: GitHub CLI로 원클릭 생성 & 푸시</span>
              </span>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                가장 간편
              </span>
            </div>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              로컬 터미널에서 GitHub CLI가 로그인되어 있다면 아래 단 한 줄의 명령어로 GitHub에 <strong>kucs94</strong> 리포지토리가 자동 생성되고 현재 코드가 푸시됩니다.
            </p>

            <div className="bg-neutral-900 text-neutral-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto relative">
              <pre className="text-neutral-200 select-all">{cliCommand}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">gh auth login 필요</span>
            <button
              onClick={() => copyToClipboard(cliCommand, 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? '복사됨' : '명령어 복사'}</span>
            </button>
          </div>
        </div>

        {/* Method 2: Git Remote URL */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-neutral-700" />
                <span>방법 B: GitHub 웹에서 생성 후 Remote 연결</span>
              </span>
              <span className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-semibold">
                표준 Git 방식
              </span>
            </div>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              1. github.com에서 새 저장소 <code className="font-mono font-bold text-neutral-900">kucs94</code>를 생성합니다.<br />
              2. 터미널에서 아래 명령어를 실행하여 원격 저장소에 푸시합니다.
            </p>

            <div className="bg-neutral-900 text-neutral-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto relative">
              <pre className="text-neutral-200 select-all">{gitCommands}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-neutral-600 hover:text-neutral-900 underline flex items-center gap-1"
            >
              <span>GitHub에서 새 저장소 만들기</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => copyToClipboard(gitCommands, 2)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 2 ? '복사됨' : '명령어 복사'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Codebase Structure Info */}
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
        <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FolderTree className="w-4 h-4 text-neutral-700" />
          <span>kucs94 저장소 핵심 아키텍처 요약</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-neutral-700">
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-mono font-bold text-neutral-900 block mb-1">README.md</span>
            <span>KUCS 94 프로젝트 설명서, 설치 방법 및 동기회 경조 지원 지침서가 완전 수록되어 있습니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-mono font-bold text-neutral-900 block mb-1">src/data/*</span>
            <span>장례 3일장, 결혼 10단계 식순, 서식 문구, 모바일 알림 템플릿 데이터가 체계화되어 있습니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-mono font-bold text-neutral-900 block mb-1">src/components/*</span>
            <span>봉투 시뮬레이터, 축·조의금 계산기, 카카오톡 메시지 생성기 등 독립 컴포넌트 구조입니다.</span>
          </div>
          <div className="p-3 bg-white rounded-lg border border-neutral-200">
            <span className="font-mono font-bold text-neutral-900 block mb-1">Vite + React 19</span>
            <span>최신 웹 표준과 Tailwind v4로 즉시 빌드 및 Vercel/GitHub Pages 배포가 가능합니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
