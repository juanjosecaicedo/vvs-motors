-- Seed data for VVS Motors
-- This script populates the database with initial data

-- Insert sample cars
INSERT INTO cars (brand, model, year, price, transmission, fuel_type, engine, description, image_url, mileage, color, featured)
VALUES
  ('BMW', 'Serie 3', 2023, 45000000, 'Automático', 'Gasolina', '2.0L Turbo', 'Vehículo premium con tecnología de última generación y máximo confort.', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 5000, 'Negro', true),
  ('Audi', 'A4', 2022, 35000000, 'Automático', 'Gasolina', '1.8L TFSI', 'Elegancia y rendimiento en un solo vehículo. Perfecto para la ciudad.', 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 12000, 'Blanco', true),
  ('Mercedes-Benz', 'C-Class', 2023, 55000000, 'Automático', 'Gasolina', '2.5L V6', 'Lujo y sofisticación alemana con la mejor tecnología incorporada.', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 3000, 'Plateado', true),
  ('Honda', 'Civic', 2023, 28000000, 'Manual', 'Gasolina', '1.6L VTEC', 'Confiabilidad japonesa con excelente rendimiento de combustible.', 'https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 8000, 'Rojo', false),
  ('Porsche', 'Macan', 2023, 65000000, 'Automático', 'Gasolina', '3.0L V6', 'SUV deportivo con el DNA de Porsche y versatilidad familiar.', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 2000, 'Azul', true),
  ('Toyota', 'RAV4', 2023, 32000000, 'Automático', 'Híbrido', '2.0L Híbrido', 'SUV híbrido con la confiabilidad Toyota y tecnología eco-friendly.', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 6000, 'Gris', false);

-- Insert sample promotions
INSERT INTO promotions (title, description, discount_value, icon, active)
VALUES
  ('Financiamiento 0%', 'Hasta 60 cuotas sin intereses en vehículos seleccionados', '0% Interés', '💰', true),
  ('Descuento por Cambio', 'Entrega tu vehículo usado y obtén hasta 25% de descuento', '25% OFF', '🚗', true),
  ('Oferta Flash', 'Descuento directo en efectivo por compras este mes', '$500K', '⚡', true);

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES
  ('admin@vvsmotors.com', '$2a$10$X7K8QqX9rRqWrZ7b6dWYNuFVGzJqH5xKnZ6YxZKZxZKZxZKZxZKZxe', 'VVS Motors Admin', 'admin');

-- Note: In production, you should use a proper password hashing function
-- The password hash above is just a placeholder
