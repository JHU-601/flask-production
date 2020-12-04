
.PHONY: install

install:
	cp cfg/clueless.service /etc/systemd/system
	systemctl daemon-reload
