import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import PurpleDot, { usePurpleDot } from './PurpleDotContext';

describe('<PurpleDot />', () => {
  it('loads the SDK and makes it available as a context', async () => {
    const apiKey = '123bcd';

    render(
      <PurpleDot apiKey={apiKey}>
        <ComponentThatUsesPurpleDot />
      </PurpleDot>,
    );

    await waitFor(() => expect(screen.getByText(apiKey)).toBeInTheDocument());
  });
});

function ComponentThatUsesPurpleDot() {
  const purpleDot = usePurpleDot();

  return (
    <p>{purpleDot && purpleDot.getApiKey()}</p>
  );
}
