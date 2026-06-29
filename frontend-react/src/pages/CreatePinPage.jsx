import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinApi } from '../services/api';
import Numpad from '../components/Numpad';

export default function CreatePinPage() {
  const navigate = useNavigate();
  
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePinPress = (num) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
      setError('');
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  useEffect(() => {
    const submitPin = async () => {
      setError('');
      setLoading(true);
      try {
        await pinApi.createPin(pin);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
        setPin(''); // Reset PIN on error
      } finally {
        setLoading(false);
      }
    };

    if (pin.length === 6) {
      submitPin();
    }
  }, [pin, navigate]);

  return (
    <div className="auth-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center font-bold mb-2 text-dark" style={{ fontSize: '1.75rem' }}>Buat PIN Baru</h1>
        <p className="text-center text-muted mb-8">
          Buat PIN 6 digit untuk keamanan akun Anda
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="pin-display">
            {[...Array(6)].map((_, i) => {
              const isPinFilled = i < pin.length;
              return (
                <span key={i} style={{
                  display: 'block',
                  width: '14px',
                  height: '14px',
                  minWidth: '14px',
                  minHeight: '14px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  backgroundColor: isPinFilled ? '#10b981' : 'transparent',
                  border: '2px solid #10b981',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.15s ease'
                }} />
              );
            })}
          </div>

          {loading && <p className="text-center text-muted mb-4">Menyimpan PIN...</p>}

          <Numpad onKeyPress={handlePinPress} onDelete={handlePinDelete} />
        </div>
      </div>
    </div>
  );
}
