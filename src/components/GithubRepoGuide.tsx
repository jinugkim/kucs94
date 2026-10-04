import React, { useState } from 'react';
import { GitBranch, Terminal, Copy, Check, ExternalLink, Github, FolderTree, Code2 } from 'lucide-react';

export const GithubRepoGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [githubUsername, setGithubUsername] = useState('jinugkim');

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const directPushCommand = `git push -u origin main`;
  const tokenPushCommand = `git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/${githubUsername}/kucs94.git main`;
  const sshPushCommand = `git remote set-url origin git@github.com:${githubUsername}/kucs94.git\ngit push -u origin main`;
  const cliCommand = `gh repo create ${githubUsername}/kucs94 --public --source=. --remote=origin --push`;

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
          <a
            href={`https://github.com/${githubUsername}/kucs94`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-white text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5" />
            <span>저장소 바로가기</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
        </div>
      </div>

      {/* Current Origin Status Banner */}
      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            현재 로컬 Git의 원격 저장소(`origin`)가 <strong>https://github.com/{githubUsername}/kucs94.git</strong> 으로 설정되었습니다.
          </span>
        </div>
        <span className="font-mono text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded">
          branch: main
        </span>
      </div>

      {/* Methods Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Method 1: Direct Push */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-700" />
                <span>방법 1: 표준 Git 푸시</span>
              </span>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                원격 설정 완료
              </span>
            </div>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              로컬 터미널에서 아래 명령어를 실행하여 GitHub으로 커밋을 업로드합니다. (GitHub 로그인/자격증명 창이 열립니다)
            </p>

            <div className="bg-neutral-900 text-neutral-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto relative">
              <pre className="text-neutral-200 select-all">{directPushCommand}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">Default branch: main</span>
            <button
              onClick={() => copyToClipboard(directPushCommand, 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? '복사됨' : '명령어 복사'}</span>
            </button>
          </div>
        </div>

        {/* Method 2: Personal Access Token (PAT) */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-neutral-700" />
                <span>방법 2: GitHub 토큰(PAT)으로 인증 푸시</span>
              </span>
              <span className="text-[11px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-semibold">
                비밀번호 오류 시
              </span>
            </div>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              터미널 비밀번호 인증이 막힐 경우 GitHub Settings에서 발급받은 Personal Access Token을 넣어 즉시 푸시할 수 있습니다.
            </p>

            <div className="bg-neutral-900 text-neutral-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto relative">
              <pre className="text-neutral-200 select-all">{tokenPushCommand}</pre>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-neutral-600 hover:text-neutral-900 underline flex items-center gap-1"
            >
              <span>GitHub 토큰 발급</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => copyToClipboard(tokenPushCommand, 2)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 2 ? '복사됨' : '명령어 복사'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SSH Alternative */}
      <div className="p-4 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <strong className="text-neutral-900">SSH 키를 등록해 사용하시는 경우:</strong>
          <span className="text-neutral-600 ml-1.5 font-mono">git remote set-url origin git@github.com:{githubUsername}/kucs94.git && git push -u origin main</span>
        </div>
        <button
          onClick={() => copyToClipboard(sshPushCommand, 3)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          {copiedIndex === 3 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>SSH 명령어 복사</span>
        </button>
      </div>
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
