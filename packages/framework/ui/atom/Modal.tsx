import { Modal, ModalProps } from '@mantine/core'

function createModal(defaults: Partial<ModalProps>) {
  function SdModalRoot(props: ModalProps) {
    return <Modal {...defaults} {...props} />
  }
  SdModalRoot.Header = Modal.Header
  SdModalRoot.Title = Modal.Title
  SdModalRoot.Body = Modal.Body
  SdModalRoot.CloseButton = Modal.CloseButton
  return SdModalRoot
}

export const SdModal = createModal({
  size: 'md',
  overlayProps: { backgroundOpacity: 0.4, blur: 4 },
})
