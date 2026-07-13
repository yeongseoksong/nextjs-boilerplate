import { Box, Center, Stack } from '@mantine/core';
import { SdContainer } from '../atom/Container';
import { ReactNode } from 'react';
import { NavItem } from '../../types';
import { SdTextBox } from '../molecule/TextBox';

interface PageHeroProps {
  image?: string;
  title: ReactNode;
  description?: ReactNode;
}

interface PageLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  image?: string;
  title?: ReactNode;
  description?: ReactNode;
}

function PageHero({ image, title, description }: PageHeroProps) {
  return (
    <Box
      py={100}
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Box style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
        <SdTextBox.Hero
          title={title}
          description={description}
          ta="center"
          align="center"
          maw={680}
          mx="auto"
        />
    </Box>
  );
}

export function PageLayout({ children, image, title, description }: PageLayoutProps) {
  return (
    <>
      <PageHero image={image} title={title} description={description} />
      <SdContainer py='xl'>
        <Center>
         {children}
        </Center>
      </SdContainer>
    </>
  );
}
