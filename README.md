pnpm changeset            # 변경 기록
pnpm changeset version    # package.json + CHANGELOG 수정 (커밋 안 함)
git add -A
git commit -m "release: framework"   # ← 반드시 먼저 커밋
pnpm changeset tag        # ← 그 커밋에 태그
git push --follow-tags