import React from 'react';
import Settings from './components/Settings';
// Settings will let user configure what files to ignore in projects
// How often to check for updates
// Stretch (kinda): changing color theme
function SettingsPage() {
  return (
    <div>
      <Settings />
    </div>
  );
}

export default SettingsPage;
