
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: (apiKey?: string) => void;
}

const APIKeyModal: React.FC<APIKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onClose(apiKey.trim());
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enter OpenWeatherMap API Key</DialogTitle>
            <DialogDescription>
              You need an API key from OpenWeatherMap to use this app. 
              Please visit <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                openweathermap.org/api
              </a> to get your free API key.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key here"
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={!apiKey.trim()}>
              Save API Key
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyModal;
