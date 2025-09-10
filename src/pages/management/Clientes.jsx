import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, MapPin, Building } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ClientForm from '../../components/forms/ClientForm';

const Clientes = () => {
  const [clients, setClients] = useState([
    {
      id: 'C001',
      nombre: 'Valentino Olivas',
      tipo: 'Colegio',
      contacto: '987654321',
      email: 'valentino@email.com',
      ie: 'I.E Contas',
      direccion: 'Av. Lima 123, San Juan de Lurigancho',
      detalles: 'Auto padrino, cliente frecuente desde 2020',
      fechaRegistro: '2020-03-15',
      ultimoPedido: '2025-06-08',
      totalPedidos: 15,
      montoTotal: 3250.00
    },
    {
      id: 'C002',
      nombre: 'María López García',
      tipo: 'Particular',
      contacto: '987654322',
      email: 'maria.lopez@email.com',
      ie: '',
      direccion: 'Jr. Cusco 456, Cercado de Lima',
      detalles: 'Cliente frecuente, prefiere marcos clásicos',
      fechaRegistro: '2021-07-22',
      ultimoPedido: '2025-06-07',
      totalPedidos: 8,
      montoTotal: 1450.00
    },
    {
      id: 'C003',
      nombre: 'I.E. San Martín de Porres',
      tipo: 'Colegio',
      contacto: '014567890',
      email: 'direccion@sanmartin.edu.pe',
      ie: 'I.E. San Martín de Porres',
      direccion: 'Av. Colonial 789, Callao',
      detalles: 'Contrato anual de promoción escolar',
      fechaRegistro: '2019-02-10',
      ultimoPedido: '2025-06-05',
      totalPedidos: 24,
      montoTotal: 15750.00
    },
    {
      id: 'C004',
      nombre: 'Familia Rodríguez',
      tipo: 'Particular',
      contacto: '987654324',
      email: 'rodriguez.familia@email.com',
      ie: '',
      direccion: 'Av. Brasil 321, Magdalena',
      detalles: 'Sesiones familiares anuales',
      fechaRegistro: '2022-11-05',
      ultimoPedido: '2025-06-06',
      totalPedidos: 4,
      montoTotal: 890.00
    },
    {
      id: 'C005',
      nombre: 'Empresa TechSolutions SAC',
      tipo: 'Empresa',
      contacto: '012345678',
      email: 'eventos@techsolutions.com',
      ie: 'TechSolutions SAC',
      direccion: 'Jr. Lampa 654, Cercado de Lima',
      detalles: 'Eventos corporativos y fotografía institucional',
      fechaRegistro: '2023-01-18',
      ultimoPedido: '2025-05-28',
      totalPedidos: 6,
      montoTotal: 2100.00
    }
  ]);

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientForm, setShowClientForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const typeColors = {
    'Particular': 'bg-blue-100 text-blue-800',
    'Colegio': 'bg-green-100 text-green-800',
    'Empresa': 'bg-purple-100 text-purple-800'
  };

  const handleCreateClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: `C${String(clients.length + 1).padStart(3, '0')}`,
      fechaRegistro: new Date().toISOString().split('T')[0],
      ultimoPedido: null,
      totalPedidos: 0,
      montoTotal: 0
    };
    setClients([...clients, newClient]);
    setShowClientForm(false);
  };

  const handleEditClient = (clientData) => {
    setClients(clients.map(client => 
      client.id === selectedClient.id ? { ...client, ...clientData } : client
    ));
    setSelectedClient(null);
    setShowClientForm(false);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contacto.includes(searchTerm);
    const matchesType = typeFilter === 'todos' || client.tipo === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const ClientCard = ({ client }) => (
    <Card className="hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{client.nombre}</h3>
            <p className="text-sm text-gray-500">Cliente #{client.id}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[client.tipo]}`}>
          {client.tipo}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{client.contacto}</span>
        </div>
        
        {client.email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{client.email}</span>
          </div>
        )}
        
        {client.ie && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            <span>{client.ie}</span>
          </div>
        )}
        
        {client.direccion && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{client.direccion}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Pedidos</p>
          <p className="font-semibold text-gray-900">{client.totalPedidos}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Monto Total</p>
          <p className="font-semibold text-gray-900">S/ {client.montoTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          icon={<Eye className="w-4 h-4" />}
          onClick={() => {
            setSelectedClient(client);
            setShowClientModal(true);
          }}
        >
          Ver
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => {
              setSelectedClient(client);
              setShowClientForm(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => handleDeleteClient(client.id)}
            className="text-red-600 hover:bg-red-50"
          />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <p className="text-sm text-gray-500">Gestiona tu base de datos de clientes</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowClientForm(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Nuevo Cliente
        </button>
      </div>

      {/* Filtros */}
      <Card className="mb-6 border border-primary/10 bg-primary/10">
        <h3 className="font-semibold text-gray-900 mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cliente</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="todos">Todos</option>
              <option value="Particular">Particular</option>
              <option value="Colegio">Colegio</option>
              <option value="Empresa">Empresa</option>
            </select>
          </div>
          <div className="md:col-span-2 flex items-end">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-all">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </Card>

      {/* Listado de Clientes */}
      <Card className="border border-primary/10">
        <h3 className="font-semibold text-gray-900 mb-4">Listado de Clientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-primary/10">
                <th className="text-left py-3 px-4 font-medium text-gray-800">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Nombre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Tipo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Contacto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Nombre I.E</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Dirección</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Detalles Adicionales</th>
                <th className="text-left py-3 px-4 font-medium text-gray-800">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client, idx) => (
                <tr key={client.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-primary/5'} hover:bg-primary/10`}>
                  <td className="py-3 px-4 text-sm font-medium">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{client.id}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{client.nombre}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeColors[client.tipo]}`}>{client.tipo}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{client.contacto}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{client.ie || '-'}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 truncate max-w-[220px]">{client.direccion}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 truncate max-w-[220px]">{client.detalles || '-'}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowClientModal(true);
                        }}
                        className="p-1 hover:bg-primary/10 rounded text-primary hover:text-primary"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowClientForm(true);
                        }}
                        className="p-1 hover:bg-secondary/10 rounded text-secondary hover:text-secondary"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredClients.length)} de {filteredClients.length} resultados
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded text-sm ${
                  page === currentPage
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </Card>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
          <p className="text-gray-500 mb-4">Añade tu primer cliente para comenzar</p>
          <Button 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowClientForm(true)}
          >
            Nuevo Cliente
          </Button>
        </div>
      )}

      {/* Client Detail Modal */}
      <Modal
        isOpen={showClientModal}
        onClose={() => {
          setShowClientModal(false);
          setSelectedClient(null);
        }}
        title={selectedClient?.nombre}
        size="lg"
      >
        {selectedClient && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedClient.nombre}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[selectedClient.tipo]}`}>
                  {selectedClient.tipo}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente ID</label>
                <p className="text-gray-900">{selectedClient.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Registro</label>
                <p className="text-gray-900">{selectedClient.fechaRegistro}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <p className="text-gray-900">{selectedClient.contacto}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedClient.email || 'No registrado'}</p>
              </div>
              {selectedClient.ie && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
                  <p className="text-gray-900">{selectedClient.ie}</p>
                </div>
              )}
              {selectedClient.direccion && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <p className="text-gray-900">{selectedClient.direccion}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{selectedClient.totalPedidos}</p>
                <p className="text-sm text-gray-500">Total Pedidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">S/ {selectedClient.montoTotal.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Monto Total</p>
              </div>
            </div>

            {selectedClient.detalles && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detalles Adicionales</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedClient.detalles}</p>
                </div>
              </div>
            )}

            <Modal.Footer>
              <Button 
                variant="outline" 
                onClick={() => setShowClientModal(false)}
              >
                Cerrar
              </Button>
              <Button 
                variant="secondary"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => {
                  setShowClientModal(false);
                  setShowClientForm(true);
                }}
              >
                Editar
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>

      {/* Client Form Modal */}
      <Modal
        isOpen={showClientForm}
        onClose={() => {
          setShowClientForm(false);
          setSelectedClient(null);
        }}
        title={selectedClient ? 'Editar Cliente' : 'Nuevo Cliente'}
        size="xl"
      >
        <ClientForm
          client={selectedClient}
          onSubmit={selectedClient ? handleEditClient : handleCreateClient}
          onCancel={() => {
            setShowClientForm(false);
            setSelectedClient(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Clientes;