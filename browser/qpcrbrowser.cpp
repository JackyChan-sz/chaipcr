#include "qpcrbrowser.h"
#include "qpcrpage.h"

#include <QtGui>

QPCRBrowser::QPCRBrowser()
{
    setPage(new QPCRPage(this));
    setCursor(Qt::BlankCursor);
    loadRoot();
}

QPCRBrowser::~QPCRBrowser()
{

}

void QPCRBrowser::loadSplashScreen()
{
    load(QUrl("file:///" + QDir::currentPath() + "/resources/splash.html"));
}

void QPCRBrowser::loadRoot()
{
    load(QPCR_ROOT_URL);
}

void QPCRBrowser::closeEvent(QCloseEvent *event)
{
    event->ignore();
}

void QPCRBrowser::contextMenuEvent(QContextMenuEvent *event)
{
    event->ignore();
}
