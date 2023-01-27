import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  const id = 'react-query-id';
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

// to satisfy typescript until this file has uncommented contents

export const queryClient = new QueryClient({
  // queryClient 쪽에서 defaultOptions를 사용하여 전역적으로 onError를 발생시키도록 하기
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
