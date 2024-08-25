import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DashboardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Volume alvo</TableHead>
          <TableHead>Arrecadação</TableHead>
          <TableHead>Aberta em</TableHead>
          <TableHead>Prazo alvo</TableHead>
          <TableHead>Alertas</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow></TableRow>
      </TableBody>
    </Table>
  );
}
