package bingo::Controller::Bingo;
use Mojo::Base 'Mojolicious::Controller';

sub bingo {
  my $self = shift;
  $self->render();
}

1;
