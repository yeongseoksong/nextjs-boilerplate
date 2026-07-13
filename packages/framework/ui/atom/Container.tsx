import { Container, type ContainerProps } from "@mantine/core";

export function SdContainer({ children, ...props }: ContainerProps) {
  return (
    <Container px={{ base: 'md', sm: 'xl' }} {...props}>
      {children}
    </Container>
  );
}
