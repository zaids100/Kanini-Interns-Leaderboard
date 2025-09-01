import { useUser } from '../contexts/UserContext';

export default function TokenDebug() {
  const { user, token, setUser, setToken } = useUser();

  const checkTokenState = () => {
    console.log('=== TOKEN DEBUG ===');
    console.log('Context token:', token ? 'Present' : 'Missing');
    console.log('localStorage token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    console.log('Context user:', user ? 'Present' : 'Missing');
    console.log('localStorage user:', localStorage.getItem('user') ? 'Present' : 'Missing');
    
    if (token) {
      console.log('Token length:', token.length);
      console.log('Token start:', token.substring(0, 20) + '...');
    }
    console.log('==================');
  };

  const clearToken = () => {
    console.log('Manually clearing token...');
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // adding a comment here to check render 
  };

  const restoreToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      console.log('Restoring token from localStorage...');
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      console.log('No stored token/user found');
    }
  };

  return (
    <div className="fixed top-20 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4 z-50">
      <h3 className="font-bold text-yellow-800 mb-2">Token Debug</h3>
      <div className="space-y-2">
        <button
          onClick={checkTokenState}
          className="w-full px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded text-sm"
        >
          Check State
        </button>
        <button
          onClick={clearToken}
          className="w-full px-3 py-1 bg-red-200 hover:bg-red-300 text-red-800 rounded text-sm"
        >
          Clear Token
        </button>
        <button
          onClick={restoreToken}
          className="w-full px-3 py-1 bg-green-200 hover:bg-green-300 text-green-800 rounded text-sm"
        >
          Restore Token
        </button>
      </div>
      <div className="mt-2 text-xs text-yellow-700">
        Token: {token ? '✅' : '❌'}<br/>
        User: {user ? '✅' : '❌'}
      </div>
    </div>
  );
}
