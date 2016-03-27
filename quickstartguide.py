from http.server import BaseHTTPRequestHandler, HTTPServer
import sys
import time
import json


class MyServer(HTTPServer):
    def init_state(self):
        """
        You can store states over multiple requests in the server
        """
        self.round_phase = None


class MyRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers['Content-Length'])
        body = self.rfile.read(length).decode('utf-8')

        self.parse_payload(json.loads(body))

        self.send_header('Content-type', 'text/html')
        self.send_response(200)
        self.end_headers()

    def parse_payload(self, payload):
        round_phase = self.get_round_phase(payload)

        if round_phase != self.server.round_phase:
            self.server.round_phase = round_phase
            print('New round phase: %s' % round_phase)

    def get_round_phase(self, payload):
        if 'round' in payload and 'phase' in payload['round']:
            return payload['round']['phase']
        else:
            return None

    def log_message(self, format, *args):
        """
        Prevents requests from printing into the console
        """
        return


server = MyServer(('localhost', 3000), MyRequestHandler)

server.init_state()

print(time.asctime(), '-', 'CS:GO GSI Quick Start server starting')

try:
    server.serve_forever()
except (KeyboardInterrupt, SystemExit):
    pass

server.server_close()
print(time.asctime(), '-', 'CS:GO GSI Quick Start server stopped')
