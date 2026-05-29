'use client';

import { AppShell, Box, Container, Stack } from '@mantine/core';
import { SdHeader, SdFooter } from '../organism';
import { SdTitle } from '../atom/Title';
import { SdText } from '../atom/Text';
import { NavItem } from '../../types';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  title: ReactNode;
  description?: ReactNode;
}

function PageHero({ title, description }: { title: ReactNode; description?: ReactNode }) {
  return (
    <Box
      py={80}
      style={{
        background: 'linear-gradient(135deg, var(--mantine-color-primary-8) 0%, var(--mantine-color-primary-6) 100%)',
      }}
    >
      <Container size="xl">
        <Stack gap="sm" align="center">
          <SdTitle.Display ta="center" c="white">{title}</SdTitle.Display>
          {description && (
            <SdText.Body ta="center" c="primary.1" maw={560}>{description}</SdText.Body>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (

     <>
        <PageHero title={title} description={description} />
        {children}
      </>

  );
}
