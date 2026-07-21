import { Box, Skeleton as MantineSkeleton, SkeletonProps, Stack } from '@mantine/core'

// ---------------------------------------------------------------------------
// SdSkeleton.Text — single text line pass-through
// ---------------------------------------------------------------------------
function SkeletonText({ width = '100%', ...props }: SkeletonProps) {
  return <MantineSkeleton height={14} width={width} radius="sm" {...props} />
}

// ---------------------------------------------------------------------------
// SdSkeleton.Title — heading-sized line (default 60% wide)
// ---------------------------------------------------------------------------
function SkeletonTitle({ width = '60%', ...props }: SkeletonProps) {
  return <MantineSkeleton height={20} width={width} radius="sm" {...props} />
}

// ---------------------------------------------------------------------------
// SdSkeleton.Image — rectangular image / banner placeholder
// ---------------------------------------------------------------------------
function SkeletonImage({ height = 200, ...props }: SkeletonProps) {
  return <MantineSkeleton height={height} radius="md" {...props} />
}

// ---------------------------------------------------------------------------
// SdSkeleton.Avatar — circular avatar placeholder
// ---------------------------------------------------------------------------
function SkeletonAvatar({ size = 40, ...props }: SkeletonProps & { size?: number }) {
  return <MantineSkeleton height={size} width={size} circle {...props} />
}

// ---------------------------------------------------------------------------
// SdSkeleton.Card — card with title + body lines
// ---------------------------------------------------------------------------
interface CardProps {
  /** Card height (px). Omit to let content determine height. */
  height?: number
  /** Number of body text lines. Defaults to 3. */
  lines?: number
}

function SkeletonCard({ height, lines = 3 }: CardProps) {
  return (
    <Box
      p="md"
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        border: '1px solid var(--mantine-color-gray-3)',
        height,
      }}
    >
      <Stack gap="sm">
        <MantineSkeleton height={20} width="50%" radius="sm" />
        {Array.from({ length: lines }).map((_, i) => (
          <MantineSkeleton
            key={i}
            height={14}
            width={i === lines - 1 ? '70%' : '100%'}
            radius="sm"
          />
        ))}
      </Stack>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// Namespace export
// ---------------------------------------------------------------------------
export const SdSkeleton = {
  Card: SkeletonCard,
  Text: SkeletonText,
  Title: SkeletonTitle,
  Image: SkeletonImage,
  Avatar: SkeletonAvatar,
}

// Server Component에서 직접 import 가능한 개별 export
export const SdSkeletonCard = SkeletonCard
export const SdSkeletonText = SkeletonText
export const SdSkeletonTitle = SkeletonTitle
export const SdSkeletonImage = SkeletonImage
export const SdSkeletonAvatar = SkeletonAvatar
