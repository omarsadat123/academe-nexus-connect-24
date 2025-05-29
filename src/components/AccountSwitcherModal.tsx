
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface AccountSwitcherModalProps {
  onClose: () => void;
}

const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({ onClose }) => {
  const { user, switchAccount } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>(user?.role || 'student');
  const [loading, setLoading] = useState(false);

  const handleSwitchAccount = async () => {
    setLoading(true);
    try {
      await switchAccount(role, displayName);
      onClose();
    } catch (error) {
      console.error('Error switching account:', error);
      alert('Failed to switch account');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as 'student' | 'faculty' | 'admin');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch Account</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter display name"
            />
          </div>
          
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSwitchAccount} disabled={loading}>
            {loading ? 'Switching...' : 'Switch Account'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSwitcherModal;
