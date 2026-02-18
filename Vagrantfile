# -----------------------------
# Monkey patch File.exists? for modern Ruby/Vagrant
# -----------------------------
class File
  class << self
    alias_method :exists?, :exist? unless method_defined?(:exists?)
  end
end

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.hostname = "portfolio-dev"
 
  # Sync directly into a dev folder
  config.vm.synced_folder ".", "/home/vagrant/dev",
    type: "rsync",
    rsync__auto: true,
    rsync__exclude: [".git/", "bin/", "obj/", "node_modules/"]

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "6144"
    vb.cpus = 4    
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  config.vm.network "forwarded_port", guest: 5173, host: 5173, auto_correct: true # Vite
  config.vm.network "forwarded_port", guest: 7071, host: 7071, auto_correct: true # API
  config.vm.network "forwarded_port", guest: 7072, host: 7072, auto_correct: true # Data Access
  config.vm.network "forwarded_port", guest: 8081, host: 8081, auto_correct: true # Cosmos DB

  config.vm.provision "shell", path: "bootstrap.sh"
end