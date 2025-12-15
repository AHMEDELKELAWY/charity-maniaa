import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationMapProps {
  className?: string;
}

const LocationMap = ({ className = '' }: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch token from edge function
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-mapbox-token`);
        if (response.ok) {
          const data = await response.json();
          setMapboxToken(data.token);
        }
      } catch (error) {
        console.error('Failed to fetch Mapbox token:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Coordinates for RMP3+957 Itay El Barud, Egypt (approximately)
    const coordinates: [number, number] = [30.5083, 31.0258];

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 15,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-left'
    );

    // Add marker for the charity location
    const marker = new mapboxgl.Marker({ color: '#16a34a' })
      .setLngLat(coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="text-align: right; font-family: 'Tajawal', sans-serif; padding: 8px;">
            <strong style="color: #16a34a;">الجمعية الخيرية بمعنيا</strong>
            <p style="margin: 4px 0 0; color: #666;">إيتاي البارود - مصر</p>
          </div>
        `)
      )
      .addTo(map.current);

    // Open popup by default
    marker.togglePopup();

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-xl ${className}`}>
        <div className="text-muted-foreground">جاري تحميل الخريطة...</div>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-xl ${className}`}>
        <div className="text-muted-foreground">تعذر تحميل الخريطة</div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default LocationMap;
